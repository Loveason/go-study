// sorter
package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"os"
	"sorter/src/algorithms/qsort"
	"strconv"
)

var infile *string = flag.String("i", "infile", "File contains values for sorting")
var outfile *string = flag.String("o", "outfile", "File to receive sorted values")
var algorithm *string = flag.String("a", "qsort", "Sort algorithm")

func main() {
	values := []int{6, 1, 2, 7, 9, 3, 4, 5, 10, 8}
	qsort.QuickSort(values)
	//	flag.Parse()
	//	if infile != nil {
	//		fmt.Println("infile =", *infile, "outfile =", *outfile, "algorithm =", *algorithm)
	//	}

	//	values, err := readValues(*infile)

	//	if err != nil {
	//		fmt.Println(err)
	//	} else {
	//		fmt.Println("Read values: ", values)
	//	}
}

//从文件读取数据
func readValues(infile string) (values []int, err error) {
	file, err := os.Open(infile)
	if err != nil {
		fmt.Println("Failed to open the input file ", infile)
		return
	}

	defer file.Close()

	br := bufio.NewReader(file)
	values = make([]int, 0)
	for {
		line, isPrefix, err1 := br.ReadLine()
		if err1 != nil {
			if err1 != io.EOF {
				err = err1
			}
			break
		}

		// 如果找到行尾标记，则返回查找结果，isPrefix 返回 false。
		// 如果未找到行尾标记，则：
		// 1、缓存不满，则将缓存填满后再次查找。
		// 2、缓存是满的，则返回整个缓存，isPrefix 返回 true。
		if isPrefix {
			fmt.Println("A too long line, seems unexpected.")
			return
		}

		str := string(line) //转换字符数组为字符串
		value, err1 := strconv.Atoi(str)

		if err1 != nil {
			err = err1
			return
		}

		values = append(values, value)
	}
	return
}

func writeValues(values []int, outfile string) error {
	file, err := os.Create(outfile)
	if err != nil {
		fmt.Println("Failed to create the output file ", outfile)
		return err
	}

	defer file.Close()

	for _, value := range values {
		str := strconv.Itoa(value)
		file.WriteString(str + "\n")
	}
	return nil
}
