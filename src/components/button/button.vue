<template>
  <div class="ws-button">
      <button class="btn" :class="['btn-'+size,{
        'btn-block':block,
        'inactived':!actived,
        'radius':radius,
        'hollow':hollow,
        'disabled':disabled
      }]" @click="handleClick">{{text}}</button>
  </div>
</template>

<script>
export default {
  name: "ws-button",
  data(){
    return{
    }
  },
  created(){
  },
  methods:{
    handleClick(evt) {
      if(!this.actived) return;
      this.$emit('click', evt);
    }
  },
  props: {
    text:String,
    size:{
      type:String,
      default: "normal",
      validator(value) {
        return ["mini", "small","normal","large"].indexOf(value) > -1;
      }
    },
    actived: Boolean,
    radius: Boolean,
    block:Boolean,
    disabled:Boolean,
    hollow:Boolean
  }
};
</script>


<style scoped>
.ws-button{
  /* padding: 0.625rem 0; */
}
.ws-button .btn{
  max-width: 100%;
  background: #F76C5B;
  border: 1px solid #F76C5B;
  color: #fff;
  height: 2.3125rem;
  width: 10.3125rem;
  font-size: 0.875rem;
  border-radius: 5px;
  -webkit-border-radius:5px;
}
/*不可用*/
.ws-button .btn.disabled{
  background: #c9c9c9;
  color: #fff;
}
.ws-button .btn.disabled.hollow{
  background: #fff;
  color: #c9c9c9;
  border-color: #c9c9c9;
}
/*未激活*/
.ws-button .btn.inactived{
  background: #ffb1a8;
  border-color: #ffb1a8;
}
/*圆角*/
.ws-button .btn.radius{
  border-radius: 2rem;
  -webkit-border-radius:2rem;
}
.ws-button .btn.hollow{
  color: #F76C5B;
  background: #fff;
}

/*块级按钮*/
.ws-button .btn-block{
  width: 100%;
  max-width: 100%;
}
/*mini*/
.ws-button .btn-mini{
  font-size: 0.65625rem;
  height: 0.9375rem;
}
.ws-button .btn-small{

}

.ws-button .btn-normal{
  height: 2.3125rem;  
}

.ws-button .btn-large{
  height: 2.8125rem;
  font-size: 0.9375rem;
}
</style>