// REPORT TYPE

export type T_Report = {
    _id: Number;
    date: String;
    duration: Number;
    teams: Array<'uxs' | 'devs'>;
    summary: String;
    points?: Array<String>;
    actions?: Array<String>;
    blockers?: {
        blocker?: Array<String>;
        issues?: Array<String>;
        solutions?: Array<String>;
    };
};
