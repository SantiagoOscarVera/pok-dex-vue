import { mount } from '@vue/test-utils';
import BaseButton from '../src/components/BaseButton.vue';
import { describe, it, expect } from 'vitest';

describe('BaseButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.text()).toContain('Click me');
  });

  it('emits click event', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
