import express from "express";
import { z } from "zod";
import Flow from "../models/Flow.js";
import { agenda } from "../config/agenda.js";

const router = express.Router();

const flowSchema = z.object({
  name: z.string(),
  nodes: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["coldEmail", "delay", "leadSource"]),
      position: z.object({
        x: z.number(),
        y: z.number(),
      }),
      data: z.record(z.any()),
    })
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      target: z.string(),
    })
  ),
});

// Get all flows
router.get("/", async (req, res) => {
  try {
    const flows = await Flow.find().sort({ createdAt: -1 });
    res.json(flows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new flow
router.post("/", async (req, res) => {
  try {
    const validatedData = flowSchema.parse(req.body);
    const flow = new Flow(validatedData);
    const savedFlow = await flow.save();

    // Schedule email jobs based on the flow
    for (const node of flow.nodes) {
      if (node.type === "coldEmail") {
        const targetNode = flow.nodes.find((n) =>
          flow.edges.some((e) => e.source === node.id && e.target === n.id)
        );

        const delay = targetNode?.type === "delay" ? targetNode.data.delay : 0;

        await agenda.schedule(`in ${delay} hours`, "send-email", {
          to: node.data.to,
          subject: node.data.subject,
          body: node.data.body,
        });
      }
    }

    res.status(201).json(savedFlow);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid input data", errors: error.errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
