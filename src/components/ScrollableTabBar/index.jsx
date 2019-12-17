import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TabBar, Tab, TabScroller } from '@rmwc/tabs';
import '@material/tab-bar/dist/mdc.tab-bar.css';
import '@material/tab/dist/mdc.tab.css';
import '@material/tab-scroller/dist/mdc.tab-scroller.css';
import '@material/tab-indicator/dist/mdc.tab-indicator.css';

// TODO: 참고 https://material.io/develop/web/components/tabs/tab-bar/

function ScrollableTabBar({ children }) {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabBar>
      {children.map(li => (
        <StyledTab>
          {li}
        </StyledTab>
      ))}
    </TabBar>
  );
}

export default ScrollableTabBar;

const StyledTab = styled(Tab)`
  max-width: 208px;
  height: 56px;
  font-family: 'NotoSansCJKkr';
  font-weight: 100;
  text-align: left;
`;
