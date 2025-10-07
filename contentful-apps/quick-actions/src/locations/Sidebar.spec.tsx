import Sidebar from './Sidebar';
import { render } from '@testing-library/react';
import { mockCma, mockSdk } from '../../test/mocks';
import { vi } from 'vitest';

vi.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
  useAutoResizer: () => {},
}));

describe('Sidebar component', () => {
  it('Displays current availability status', () => {
    const { getByText } = render(<Sidebar />);

    expect(getByText('Status:')).toBeInTheDocument();
    expect(getByText('Available')).toBeInTheDocument();
  });

  it('Renders the toggle button with correct text when Available', () => {
    const { getByText } = render(<Sidebar />);

    expect(getByText('Mark as Sold')).toBeInTheDocument();
    expect(getByText('Not for Sale')).toBeInTheDocument();
  });
});
