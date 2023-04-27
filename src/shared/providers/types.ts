import { RouteProps } from 'react-router-dom';

export type RouteData = Pick<RouteProps, 'path' | 'element'> & { key: string, name?: string };

export type NavlinkData = { key: string, name: string, path: string };