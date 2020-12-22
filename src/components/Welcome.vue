<template>
  <div class="main">
    <div class="heart">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
    <div>欢迎您</div>
    <div class="heart">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
 .main{
        height: 60px;
        /* background-color: bisque; */
        display: flex;
        justify-content:flex-start;
        align-items: center;
        
    }
    .heart{
        width: 20px;
        height: 20px;
        background: #FF0000;
        transform: rotate(45deg) scale(.5);
        opacity: .5;
        animation-name: aa;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        margin: 20px;
    }
    @keyframes aa{
       20% {
           opacity: 1;
            transform: rotate(45deg) scale(.8);
        }
        40% {
            opacity: .5;
            transform: rotate(45deg) scale(.5);
        }
        60% {
            opacity: 1;
            transform: rotate(45deg) scale(.8);
        }
        80%{
            opacity: .5;
            transform: rotate(45deg) scale(.5);
        }
        to{
            opacity: 1;
            transform: rotate(45deg) scale(.8);
        }
    }
    .heart::before {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        background-color: #FF0000;
        transform: translateX(-10px);
    }
    .heart::after {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        background-color: #FF0000;
        transform: translateY(-10px)
    }
</style>