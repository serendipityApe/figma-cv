// 规定postmessage的type和data
export enum PostMessageType {
  CREATE_RESUME = "CREATE_RESUME",
  // selected-data
  SELECTED_DATA = "SELECTED_DATA",
}
export interface PostMessageData {
  SELECTED_DATA?: {
    section: string;
    subSection?: number;
    //todo
    data: any;
  };
  // 加载完成
  LOAD?: {
    // 加载完成的页面
    page: string;
  };
}
