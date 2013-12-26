package main

import (
    "fmt"
    // "io"
    "os"
    "os/exec"
    "os/signal"
    // "strconv"
    "bufio"
    "sync"
    "time"
    // github.com/nsf/termbox-go
)

func init() {
    fmt.Println("Running init")
    // err := exec.Command("stty", "-f", "/dev/tty", "raw").Run()
    // cbreak = brkint ixon imaxbel opost isig iexten -icanon
    err := exec.Command("stty", "-f", "/dev/tty", "cbreak", "min", "1").Run()
    // if err != nil { panic(err) }
    // do not display entered characters on the screen
    // err := exec.Command("stty", "-f", "/dev/tty", "-echo").Run()
    if err != nil { panic(err) }
}

func atexit() {
    // -icanon
    fmt.Println("Running atexit")
    err := exec.Command("stty", "-f", "/dev/tty", "sane").Run()
    // err := exec.Command("stty", "-f", "/dev/tty", "echo").Run()
    if err != nil { panic(err) }
    // exec.Command("stty", "cooked").Run()
    // exec.Command("stty", "-F", "/dev/tty", "cbreak", "min", "1").Run()
    // do not display entered characters on the screen
    // exec.Command("stty", "-F", "/dev/tty", "echo").Run()
}

func readkeys(stream *os.File, keys chan string) {
    // Look into using https://github.com/nsf/termbox-go instead?
    // Or the detection method used in https://github.com/TooTallNate/keypress/blob/master/index.js,
    //   which in turn refers to http://www.midnight-commander.org/browser/lib/tty/key.c ?
    reader := bufio.NewReader(stream)
    buf := make([]byte, 0)
    for {
        // nbytesread, err := stream.Read(buf[len(buf):])
        // if err == io.EOF
        // append(buf,
        ch, err := reader.ReadByte()
        if err != nil { panic(err) }
        buf = append(buf, ch)

        // os.Stdin.Read(bytes)
        // fmt.Println("buf:", len(buf), string(buf))
        if len(buf) < 1 || buf[0] == 0x1b { // == 27
            // if len(buf) >= 3 {
            if len(buf) < 2 || buf[1] == '[' {
                // okay, it's an escape-[- ascii code, just gotta figure out what.
                if len(buf) >= 3 {
                    if buf[2] == 'A' {
                        keys <- "UP"
                    } else if buf[2] == 'B' {
                        keys <- "DOWN"
                    } else if buf[2] == 'C' {
                        keys <- "RIGHT"
                    } else if buf[2] == 'D' {
                        keys <- "LEFT"
                    } else {
                        keys <- "UNKNOWN"
                    }
                    buf = buf[3:]
                }
            } else {
                keys <- string(buf[0])
                buf = buf[1:]
            }
        } else {
            keys <- string(buf[0])
            buf = buf[1:]
        }
        // keys <- input
    }
}

func main() {
    defer atexit()

    interrupt := make(chan os.Signal, 1)
    signal.Notify(interrupt, os.Interrupt)
    go func(){
        // this will just block until any interrupts come in
        <-interrupt
        atexit()
        os.Exit(2)
    }()

    // tasks := make(chan *exec.Cmd, 64)
    keys := make(chan string)

    // var b []byte = make([]byte, 1)
    go readkeys(os.Stdin, keys)

    // spawn four worker goroutines
    concurrency := 0
    var wg sync.WaitGroup

    var worker func()
    worker = func() {
        defer wg.Done()
        defer func() { concurrency-- }()

        for {
          select {
          case key := <- keys:
            if key == "UP" {
                concurrency++
                fmt.Println("Increasing concurrency to", concurrency)
                wg.Add(1)
                go worker()
            } else if key == "DOWN" {
                fmt.Println("Decreasing concurrency to", concurrency - 1)
                return
            } else {
                fmt.Println("unrecognized keypress:", key)
            }
          default:
            fmt.Println("...")
            time.Sleep(500 * time.Millisecond)
          }
        }
    }
    for i := 0; i < 3; i++ {
        wg.Add(1)
        concurrency++
        go worker()
    }

    // generate some tasks
    // for i := 0; i < 10; i++ {
        // tasks <- exec.Command("zenity", "--info", "--text='Hello from iteration n."+strconv.Itoa(i)+"'")
    // }
    // close(tasks)

    // wait for the workers to finish
    wg.Wait()
    fmt.Println("Main thread going down!")
}
