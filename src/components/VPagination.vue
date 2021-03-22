<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pagination {
  margin: 10px 0px;
}

.pagination > .page-item {
  margin: 0px 8px;
}

.pagination > .page-item > .page-link {
  border-radius: 5px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background-color: rgb(247, 247, 247);
  color: rgb(100, 96, 96);
}

.pagination > .page-item:not(.disabled):hover > .page-link {
  background-color: rgb(24, 158, 255);
  color: #fff;
}

.pagination > .page-item.disabled > .page-link {
  visibility: hidden;
}


.pagination > .page-item.active > .page-link {
  background-color: rgb(24, 158, 255);
  color: #fff;
  cursor: default;
  border: none;
}
</style>