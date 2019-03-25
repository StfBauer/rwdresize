import * as React from 'react';
import styles from './RwdResize.module.scss';
import { IRwdResizeProps } from './IRwdResizeProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class RwdResize extends React.Component<IRwdResizeProps, {}> {
  public render(): React.ReactElement<IRwdResizeProps> {
    return (
      <div className={ styles.rwdResize }>
          I am responsive to my parent container
      </div>
    );
  }
}
