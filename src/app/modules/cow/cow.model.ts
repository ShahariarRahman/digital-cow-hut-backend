import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interfaces";
import { breed, category, label, location } from "./cow.constants";

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: location,
    },
    breed: {
      type: String,
      required: true,
      enum: breed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: label,
    },
    category: {
      type: String,
      required: true,
      enum: category,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

// validate seller of cow
cowSchema.statics.isSellerValid = async function (
  cowId: string,
  sellerId: string
): Promise<ICow | null> {
  return await this.exists({ _id: cowId, seller: sellerId }).lean();
};

// // if seller update? check if valid or not
// cowSchema.pre("findOneAndUpdate", async function (next) {
//   const updateQuery = this.getUpdate() as UpdateQuery<Partial<ICow | null>>;
//   if (!updateQuery.seller) {
//     next(); // no seller _id, so no update.
//   } else {
//     const userData = await User.findById(updateQuery.seller);
//     if (!userData) {
//       throw new ApiError(httpStatus.NOT_FOUND, "Seller not found !");
//     } else if (userData.role !== "seller") {
//       throw new ApiError(httpStatus.NOT_FOUND, "User is not a seller");
//     } else {
//       next();
//     }
//   }
// });

// // if seller exist in user model & role === seller
// cowSchema.pre("save", async function (next) {
//   const userData = await User.findById(this.seller);
//   if (!userData) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Seller is not found");
//   } else if (userData.role !== "seller") {
//     throw new ApiError(httpStatus.NOT_FOUND, "User is not a Seller");
//   } else {
//     next();
//   }
// });

export const Cow = model<ICow, CowModel>("Cow", cowSchema);
