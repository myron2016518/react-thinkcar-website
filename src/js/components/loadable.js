
import React from 'react';
import Loadable from 'react-loadable';

import { Row, Col, Card } from 'antd';
// 按需加载组件
export default function withLoadable (comp) {
  return Loadable({
    loader: comp,
    loading: (props) => {
      if (props.error) {
        return <Card style={{ width: "100%", height: "100%" }} >
          加载错误。请刷新
                </Card>;
      } else if (props.timedOut) {
        return <Card style={{ width: "100%", height: "100%" }} >
          加载超时。请刷新
                </Card>;
      } else if (props.pastDelay) {
        return <Card loading={true} style={{ width: "100%", height: "100%" }} />;
      } else {
        return null;
      }
    },
    timeout: 10000
  })
}