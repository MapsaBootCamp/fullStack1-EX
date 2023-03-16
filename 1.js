// من از وسطاش که اومدی  ال و آر رو برابر با عدد قرار دادی  یعنی پترنت رو دست بردی توش نفهمیدم چه کردی وکلا زدی تو جاده خاکی البته اگه فکر می کنی من نفهمیدم بعدا می تونیم راجع بهش صحبت کنیم
let L = 0, R = 0;
let s = "salam ali jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan";
let z = "ali";
let n = s.length;
for (let i = 1; i < n; i++) 
{
    if (i > R) {
        L = R = i;
        while (R < n && s[R-L] == s[R]) {
            R ++;
        }
        z[i] = R - L; 
        R --;
    } 
    else {
        let k = i-L;
        if (z[k] < R - i + 1) {
            z[i] = z[k];
        } 
        else {
            L = i;
            while (R < n && s[R - L] == s[R]){
                R ++;
            }
            z[i] = R - L; 
            R --;
        }
    }
}
