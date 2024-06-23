import { COLLECTIONS } from "../utils/constants";

const { Schema, model } = require("mongoose");

export const instalationSchema = new Schema(
    {
        code_instalation: {
            type: String,
            required: true,
        },
        description_instalation: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
        },
        updated_at: {
            type: Date,
            required: true,
        },
    }, {
        versionKey: 'version'
    }
);

export const CollectionInstalation = model(COLLECTIONS.INSTALACIONES, instalationSchema);
