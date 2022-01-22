export function toArray<T>(array: ArrayLike<T>): Array<T> {
	return Array.prototype.slice.call(array, 0)
}
