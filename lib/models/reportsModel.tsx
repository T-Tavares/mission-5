import mongoose from 'mongoose';

// const reportsSchema = new mongoose.Schema({
//     _id: Number,
//     date: String,
//     duration: Number,
//     window: String,
//     teams: [],
//     summary: String,
//     points: [],
//     actions: [],
//     blocker: [],
//     issues: [],
//     solutions: [],
// });

const reportsSchema = new mongoose.Schema({report: String});
const reportsModel = mongoose.models?.reports || mongoose.model('reports', reportsSchema);
// const reportsModel = mongoose.model('reports', reportsSchema);

export default reportsModel;
