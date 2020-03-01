export interface IEvent {
    "OriginalStartTimeZone": string,
    "OriginalEndTimeZone": string,
    "ReminderMinutesBeforeStart": number,
    "IsReminderOn": boolean,
    "Subject": string,
    "Start": {
        "DateTime": string,
        "TimeZone": string
    },
    "End": {
        "DateTime": string,
        "TimeZone": string
    },
    "Location": {
        "DisplayName": string
    }
}