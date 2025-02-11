export interface IProject {
    projectID: string;
    projectName: string;
    textID: string;
}

export interface IProjects {
    projects: IProject[];
}

export interface IText {
    textID: string;
    text: string;
}

export interface ILesson {
    lessonID: string;
    lessonName: string;
}

export interface ILessons {
    lessons: ILesson[];
}

export interface ILessonType {
    lessonTypeID: string;
    lessonTypeName: string;
}

export interface ILessonTypes {
    lessonTypes: ILessonType[];
}

export interface ITaskType {
    taskTypeID: string;
    taskTypeName: string;
}

export interface ITaskTypes {
    taskTypes: ITaskType[];
}

export interface IChosenTask {
    chosenTaskID: string;
    taskTypeID: string;
    order: number;
    lessonID: string;
}

export interface IChosenTasks {
    chosenTasks: IChosenTask[];
}