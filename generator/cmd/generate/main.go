package main

import (
	"fmt"
	"github.com/wirekang/kysely-playground/generator"
)

func main() {
	err := generator.Start()
	if err != nil {
		fmt.Println(err)
	}
}
