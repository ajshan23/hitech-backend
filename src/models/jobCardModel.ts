import mongoose, { Schema, Document } from "mongoose";

export interface ICounter extends Document {
    _id: string;
    sequence_value: number;
}

const counterSchema: Schema = new Schema<ICounter>({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
})

const Counter = mongoose.model<ICounter>("Counter", counterSchema);

export { Counter };






export interface IJobCard extends Document {
    _id: string;
    jobCardNumber: string;
    jobCardStatus: string;
    customerName: string;
    customerAddress: string;
    phoneNumber: string;
    InDate?: Date;
    OutDate?: Date;
    BillNo?: string;
    Make: string;//brand name like maruthy
    HP?: number;
    KVA?: number;
    RPM?: number;
    Type?: string;
    Frame: string;
    SrNo: string;//serial number
    DealerName?: string;
    warranty?: boolean;
    works?: string;
    spares?: string;
    industrialworks?: string;
    attachments: [string];
    createdAt: Date;
    updatedAt: Date;
}

const jobCardSchema: Schema = new Schema<IJobCard>({
    customerName: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    jobCardNumber: {
        type: String,
        required: true
    },
    InDate: {
        type: Date
    },
    OutDate: {
        type: Date,
    },
    BillNo: {
        type: String,
    },
    Make: {
        type: String,
    },
    HP: {
        type: Number,
    },
    KVA: {
        type: Number,
    },
    RPM: {
        type: Number,
    },
    Type: {
        type: String,
    },
    Frame: {
        type: String,
    },
    SrNo: {
        type: String,
    },
    DealerName: {
        type: String,
    },
    works: {
        type: String,
    },
    spares: {
        type: String,
    },
    industrialworks: {
        type: String,
    },
    attachments: [{
        type: String,
    }],
    warranty: {
        type: Boolean,
    },
    jobCardStatus: {
        type: String,
        enum: ["Created", "Pending", "Billing", "Returned", "Completed"],
        required: true
    },


}, { timestamps: true });


const JobCard = mongoose.model<IJobCard>("JobCard", jobCardSchema);

export { JobCard };