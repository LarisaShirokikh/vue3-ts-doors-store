import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomePage.vue";
import Login from "../components/LoginPage.vue";
import Register from "../components/RegisterPage.vue";
import AddCatalog from "../components/AddCatalog.vue";
import FileUploader from "../components/FileUploader.vue";
import AddProduct from "../components/AddProduct.vue";
import ProductDetails from "../components/Products/ProductDetails.vue";
import UploadVideo from "../components/Video/UploadVideo.vue";
import AddServices from "../components/Services/AddServices.vue";
import AddReview from "@/components/AddReview.vue";
import MyProfile from "@/components/MyProfile.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import ChapterPage from "@/components/Chapters/ChapterPage.vue";
import CategoryAll from "@/components/Chapters/ChapterAll.vue";
import CatalogsAll from "@/components/Catalog/CatalogsAll.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/addCatalog", component: AddCatalog },
  { path: "/myProfile", component: MyProfile },
  { path: "/addFile", component: FileUploader },
  { path: "/addServices", component: AddServices },
  { path: "/addProduct", component: AddProduct },
  { path: "/chapter/:id", name: "Chapter", component: ChapterPage },
  { path: "/product/:id", name: "product-details", component: ProductDetails },
  { path: "/catalog/:id", name: "Catalog", component: CategoryCard },
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
