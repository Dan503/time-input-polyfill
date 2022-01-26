// Use `import type` to prevent modern browser downloading index source code
import type { TimePolyfillFn } from './index'

export interface ExtendedWindow extends Window {
	TimePolyfill?: TimePolyfillFn
}

export const extendedWindow: ExtendedWindow | undefined = ((window as any) as ExtendedWindow)
