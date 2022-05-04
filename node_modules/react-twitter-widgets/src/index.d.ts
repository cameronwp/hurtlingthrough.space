import { Component } from 'react'

declare module 'react-twitter-widgets' {
  export type onLoad = () => any;

  export interface FollowProps {
    username: string;
    options?: Object;
    onLoad?: onLoad;
  }
  export class Follow extends Component<FollowProps, any> {
    render(): any;
  }

  export interface HashtagProps {
    hashtag: string;
    options?: Object;
    onLoad?: onLoad;
  }
  export class Hashtag extends Component<HashtagProps, any> {
    render(): any;
  }

  export interface MentionProps {
    username: string;
    options?: Object;
    onLoad?: onLoad;
  }
  export class Mention extends Component<MentionProps, any> {
    render(): any;
  }

  export interface ShareProps {
    url: string;
    options?: Object;
    onLoad?: onLoad;
  }
  export class Share extends Component<ShareProps, any> {
    render(): any;
  }

  export interface TimelineProps {
    dataSource: object;
    options?: Object;
    onLoad?: onLoad;
  }
  export class Timeline extends Component<TimelineProps, any> {
    render(): any;
  }

  export interface TweetProps {
    tweetId: string;
    options?: Object;
    onLoad?: onLoad;
  }
  export class Tweet extends Component<TweetProps, any> {
    render(): any;
  }
}
