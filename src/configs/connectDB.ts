import mongoose, { ConnectOptions } from "mongoose";

interface ConnectOptionsExtend {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const connectDB = async () => {
  try {
    await mongoose.connect(String(process.env.DATABASE_MONGOCOMPASS), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions & ConnectOptionsExtend);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
