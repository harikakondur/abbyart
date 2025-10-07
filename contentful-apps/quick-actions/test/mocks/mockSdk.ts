import { vi } from 'vitest';

const mockSdk: any = {
  app: {
    onConfigure: vi.fn(),
    getParameters: vi.fn().mockReturnValueOnce({}),
    setReady: vi.fn(),
    getCurrentState: vi.fn(),
  },
  ids: {
    app: 'test-app',
  },
  entry: {
    fields: {
      availability: {
        getValue: vi.fn().mockReturnValue('Available'),
        setValue: vi.fn().mockResolvedValue(undefined),
        onValueChanged: vi.fn().mockReturnValue(() => {}),
      },
    },
    publish: vi.fn().mockResolvedValue(undefined),
  },
};

export { mockSdk };
