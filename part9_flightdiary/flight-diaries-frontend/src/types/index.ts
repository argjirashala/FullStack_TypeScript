export enum Weather {
    Sunny = 'sunny', // eslint-disable-line no-unused-vars
    Rainy = 'rainy', // eslint-disable-line no-unused-vars
    Cloudy = 'cloudy', // eslint-disable-line no-unused-vars
    Stormy = 'stormy', // eslint-disable-line no-unused-vars
    Windy = 'windy', // eslint-disable-line no-unused-vars
  }
  
  export enum Visibility {
    Great = 'great', // eslint-disable-line no-unused-vars
    Good = 'good', // eslint-disable-line no-unused-vars
    Ok = 'ok', // eslint-disable-line no-unused-vars
    Poor = 'poor', // eslint-disable-line no-unused-vars
  }
  
  export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
  }
  