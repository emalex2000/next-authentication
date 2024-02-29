import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected succesfully")
        });

        connection.on('error', (err) =>{
            console.log(`MongoDB connection error. please make 
            sure mongoDB is running` + err
                         )
        });
    } catch (error) {
        console.log('Something Went Wrong')
    };
};