import React from 'react';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';

export const PageHeader: React.FC<{
  as: any;
  icon?: SemanticICONS;
}> = props => (
  <Header as={props.as || ""}>
    {props.icon && <Icon name={props.icon} />}
    <Header.Content>{props.children}</Header.Content>
  </Header>
);
