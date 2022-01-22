import { PolyfillInput } from "../..";

export default function can_trigger_change($input: PolyfillInput) {
	return !/--/.test($input.value)
}
