<template>
  <div>
    <div id="section-1">
        <div class="row justify-content-center">
            <div class="title">
                <h1 class="uppercase">Get your work organized</h1>
                <router-link to='/register'><b-button variant="primary mt-5">GET STARTED</b-button></router-link>
            </div>
        </div>
    </div>
    <div class="container-fluid mt-5">
        <div id="section-2">
            <div class="row p-5">
                <div class="col-md-6 col-sm-12">
                    <div class="uppercase display-4">Save your tasks, with the progress in an organized way!</div>
                </div>
                <div class="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <awesome-icon icon="book-medical" class="view-icon"></awesome-icon>
                </div>
            </div>
            <div class="row mt-5 grey-bg p-5">
                <div class="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <awesome-icon icon="share-square" class="view-icon"></awesome-icon>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="uppsercase display-4">Invite your team, and share with them all your tasks or assign tasks to them!</div>
                </div>
            </div>
            <div class="row mt-5 p-5">
                <div class="col-md-6 col-sm-12">
                    <div class="uppsercase display-4">Save your taks into a PDF file if you wish to print them later!</div>
                </div>
                <div class="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <awesome-icon icon="file-pdf" class="view-icon"></awesome-icon>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#section-1 {
    background: url('../../public/img/todos.jpg') no-repeat fixed center;
    background-size: cover;
    min-height: 80vh;
    position: relative;
}

#section-1::after {
    position: absolute;
    height: 100%;
    width: 100%;
    content: '';
    background-color: rgba(0,0,0, 0.5);
    color: white;
}

#section-1 .title {
    position: absolute;
    text-align: center;
    top: 30%;
    z-index: 2;
    color: white;
}
.view-icon {
    font-size: 6rem;
}

</style>