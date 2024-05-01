import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/HomePage.vue";
import AddCatalog from "../components/Catalog/AddCatalog.vue";
import FileUploader from "../components/FileUploader.vue";
import AddProduct from "../components/Products/AddProduct.vue";
import ProductDetails from "../components/Products/ProductDetails.vue";
import UploadVideo from "../components/Video/UploadVideo.vue";
import AddServices from "../components/Services/AddServices.vue";
import AddReview from "@/components/Review/AddReview.vue";
import MyProfile from "@/components/MyProfile.vue";
import CategoryCard from "@/components/Catalog/CategoryCard.vue";
import ChapterPage from "@/components/Chapters/ChapterPage.vue";
import CategoryAll from "@/components/Chapters/ChapterAll.vue";
import CatalogsAll from "@/components/Catalog/CatalogsAll.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/addCatalog", component: AddCatalog },
  { path: "/myProfile", component: MyProfile },
  { path: "/addFile", component: FileUploader },
  { path: "/addServices", component: AddServices },
  { path: "/addProduct", component: AddProduct },
  { path: "/chapter/:id",  component: ChapterPage },
  { path: "/product/:id",  component: ProductDetails },
  { path: "/catalog/:id",  component: CategoryCard },
  { path: "/addVideo", component: UploadVideo },
  { path: "/addReview", component: AddReview },
  { path: "/category", component: CategoryAll },
  { path: "/catalogs", component: CatalogsAll },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
