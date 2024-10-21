import mongoose from "mongoose";
import { IJobCard, Counter, ICounter, JobCard } from "../models/jobCardModel";
import { Request, Response } from "express";
import path from "path"
import fs from "fs"
import { handleMultipleFileUploads } from "../utils/uploader";
import { JobCardImage } from "../models/jobCardImage";
export const createJobTask = async (req: Request, res: Response): Promise<any> => {

    const {
        customerName,
        customerAddress,
        phoneNumber,
        InDate,
        Make,
        HP,
        KVA,
        RPM,
        Type,
        Frame,
        SrNo,
        DealerName,
        works,
        spares,
        industrialworks,
        attachments,
        warranty
    } = req.body;

    // Validate required fields
    if (!customerName || !customerAddress || !phoneNumber || !InDate || !SrNo) {
        return res.status(400).json({ message: "Every field is required", success: false });
    }

    try {


        const counter = await Counter.findOneAndUpdate(
            { _id: "jobCardNumber" },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const jobcard = new JobCard({
            jobCardNumber: counter.sequence_value,
            customerName,
            customerAddress,
            phoneNumber,
            InDate,
            Make,
            HP,
            KVA,
            RPM,
            Type,
            Frame,
            SrNo,
            DealerName,
            works,
            spares,
            industrialworks,
            attachments,
            warranty,
            jobCardStatus: "Created",
        })

        await jobcard.save();
        return res.status(201).json({ message: "Job card created successfully", success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}

export const getCreatedJobTasks = async (req: Request, res: Response): Promise<any> => {

    try {
        const jobTasks = await JobCard.find({ jobCardStatus: "Created" });
        return res.status(200).json({ message: "Job tasks fetched successfully", success: true, data: jobTasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}

export const AddImagesToJobCard = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        console.log(id);

        const jobcard = await JobCard.findById(id);
        console.log("jobcard.............................:", jobcard);

        if (!jobcard) {
            return res.status(400).json({ message: "Job card not found" });
        }
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ message: "No files provided" });
        }
        const result = await handleMultipleFileUploads(req, req.files);
        if (!result.success) {
            return res.status(400).json({ message: "upload unsuccessfull" });
        }
        for (const ele of result.uploadData || []) {
            console.log("File URL:", ele.fileUrl, "Key:", ele.key);
            await JobCardImage.create({
                image: ele.url,
                key: ele.key,
                jobCardId: jobcard._id,
            });
        }
        return res.json({ msg: "Uploaded successfull", success: true })
    } catch (error) {
        console.log("Error at upload", error);

    }
}