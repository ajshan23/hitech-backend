import { Router } from "express";
import { AddImagesToJobCard, createJobTask, getCreatedJobTasks } from "../controllers/jobTaskController";
import upload from "../helpers/MulterConfig";

const router = Router();
router.route("/")
    .post(createJobTask)
    .get(getCreatedJobTasks)

router.route("/upload/:id")
    .post(upload.array('images', 5), AddImagesToJobCard);

export default router;
