import { useEffect, useState } from "react"
import { productModel, ProductTable } from "@/entities/product"
import { ProjectTable } from "@/entities/project"
import { ProductCreateButton } from "@/features/product/create"
import { ProjectCreateButton } from "@/features/project/create"
import { ProjectStatistic } from "@/widgets/project"
import { SideNav } from "@/widgets"

export const RoadMapPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const { data: products, errorProducts, isLoadingProducts, isFetchingProducts } = productModel.useGetProductsQuery();
    const { data: projects, errorProjects, isLoadingProjects, isFetchingProjects } = productModel.useGetProductProjectsQuery(selectedProduct?.id, {
        skip: !selectedProduct
    });

    useEffect(() => {
        setSelectedProject(null);
    }, [selectedProduct]);

    return (
        <div className="flex flex-row">
            <SideNav />
            <main className="w-full overflow-y-auto gap-5 h-screen p-3 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <h1 className="text-xl font-bold">Продукты</h1>
                    <ProductTable
                        products={products}
                        selectedProduct={selectedProduct}
                        onProductClick={(product) => setSelectedProduct(product)}
                    />
                    <ProductCreateButton />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <h1 className="text-xl font-bold">Проекты</h1>
                    <ProjectTable
                        projects={projects}
                        selectedProject={selectedProject}
                        onProjectClick={(project) => setSelectedProject(project)}
                    />
                    <ProjectCreateButton />
                </div>
                <div className="w-full md:w-full lg:w-1/3">
                    <h1 className="text-xl font-bold">Статистика</h1>
                    <ProjectStatistic project={selectedProject} />
                </div>
            </main>
        </div>
    )
}