package cmdutils

import (
	"bytes"
	"fmt"
	"os/exec"
)

func Execute(name string, args ...string) error {
	fmt.Println(name, args)
	return exec.Command(name, args...).Run()
}

func ExecuteBytes(name string, args ...string) ([]byte, error) {
	fmt.Println(name, args)
	cmd := exec.Command(name, args...)
	stdout := bytes.NewBuffer(nil)
	stderr := bytes.NewBuffer(nil)
	cmd.Stdout = stdout
	cmd.Stderr = stderr
	err := cmd.Run()
	if err != nil {
		return nil, err
	}
	ss := stderr.String()
	if len(ss) > 0 {
		return nil, fmt.Errorf("stderr: %s", ss)
	}
	return stdout.Bytes(), nil
}
