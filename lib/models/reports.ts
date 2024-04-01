import {model, models, Schema} from 'mongoose';

export type T_Report = {
    _id: any;
    date: string;
    duration: number;
    window: string;
    teams: string[];
    summary: string;
    points: any[];
    actions: any[];
    blockers: {};
};

const ReportSchema = new Schema<T_Report>({
    date: {type: String, required: true},
    duration: {type: Number, required: true},
    window: {type: String, required: true},
    teams: {type: [String], required: true},
    summary: {type: String, required: true},
    points: {type: [String], required: true},
    actions: {type: [String], required: true},
    blockers: {type: Object, required: true},
});

const ReportsModel = models.reports || model('reports', ReportSchema);

export default ReportsModel;
