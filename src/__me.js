const d = {
    x: 1,
    f:function(){
        return this.x
    }
};

const b = d
console.log(b.f())