package qsort

import "testing"

func TestQuickSort1(t *testing.T) {
	values := []int{6, 1, 2, 7, 9, 3, 4, 5, 10, 8}
	QuickSort(values)
}
