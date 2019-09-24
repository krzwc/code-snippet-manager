import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PickTech from "./"

const props = {
    value: "javascript",
    options: ["javascript", "visual-studio"]
}

const actions = {
    onChange: action('onChange')
}


storiesOf('PickTech', module)
    .add('default', () => <PickTech {...props} {...actions} />)