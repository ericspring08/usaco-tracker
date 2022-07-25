class Problem {
    public title:string
    public cpid:number
    public division:string 
    public year:number
    public contest:string 
    public url:string 

    constructor(title:string, cpid:number, division:string, year:number, contest:string, url:string) {
        this.title      = title
        this.cpid       = cpid
        this.division   = division
        this.year       = year
        this.contest    = contest
        this.url        = url
    }
}

export default Problem