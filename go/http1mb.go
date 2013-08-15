// run like: go run http1mb.go
// and then benchmark it with:
// ab -c 100 -n 10000 http://127.0.0.1:8000/
package main

import "net/http"

func main() {
    bytes := make([]byte, 1024*1024)
    for i := 0; i < len(bytes); i++ {
        bytes[i] = 100
    }

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write(bytes)
    })
    http.ListenAndServe(":8000", nil)
}
