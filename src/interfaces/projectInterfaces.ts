export interface IProject {
    projectID: number;
    projectName: string;
    textID: number;
}

export interface IProjects {
    projects: IProject[];
}

export interface IText {
    textID: number;
    text: string;
}

export interface ILesson {
    lessonID: number;
    lessonName: string;
}

export interface ILessons {
    lessons: ILesson[];
}

export interface ILessonType {
    lessonTypeID: number;
    lessonTypeName: string;
}

export interface ILessonTypes {
    lessonTypes: ILessonType[];
}

export interface ITaskType {
    taskTypeID: number;
    taskTypeName: string;
}

export interface ITaskTypes {
    taskTypes: ITaskType[];
}

export interface chosenTask {
    chosenTaskID: number;
    lessonID: number;
    taskTypeID: number;
    order: number;
}