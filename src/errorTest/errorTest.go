// errorTest
package main

import (
	"fmt"
	"os"
)

func main() {
	var path string = ""
	f, err := os.Open(path)
	if err != nil {
		//handle error
	}
	//do stuff
	fmt.Println("Hello World!")
}
