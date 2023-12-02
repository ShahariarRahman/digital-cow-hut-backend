/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, UpdateQuery, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin"],
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, "password" | "role" | "_id"> | null> {
  return await this.findOne({ phoneNumber }, { password: 1, role: 1 }).lean();
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre("findOneAndUpdate", async function (next) {
  const user = this.getUpdate() as UpdateQuery<Partial<IAdmin | null>>;
  if (!user.password) {
    next(); // no password, so no update.
  } else {
    const newPassword = user.password;
    user.password = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds)
    );
    next();
  }
});

adminSchema.pre("save", async function (next) {
  // admin password hashing
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
