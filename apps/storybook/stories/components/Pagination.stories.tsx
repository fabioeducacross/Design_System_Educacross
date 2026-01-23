import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationButton,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Pagination> = {
    title: "Components/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Pagination enables navigation through multiple pages of content.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/**
 * Default pagination with links.
 */
export const Default: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@fabioeducacross/ui";

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <nav>
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item active"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item disabled"><span class="page-link">...</span></li>
      <li class="page-item"><a class="page-link" href="#">10</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdPagination>
    <EdPaginationContent>
      <EdPaginationItem><EdPaginationPrevious href="#" /></EdPaginationItem>
      <EdPaginationItem><EdPaginationLink href="#">1</EdPaginationLink></EdPaginationItem>
      <EdPaginationItem><EdPaginationLink href="#" :is-active="true">2</EdPaginationLink></EdPaginationItem>
      <EdPaginationItem><EdPaginationNext href="#" /></EdPaginationItem>
    </EdPaginationContent>
  </EdPagination>
</template>

<script setup lang="ts">
import { EdPagination, EdPaginationContent, EdPaginationItem, EdPaginationLink, EdPaginationPrevious, EdPaginationNext } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Pagination with buttons (controlled).
 */
export const WithButtons: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const totalPages = 10;

        const getPageNumbers = () => {
            const pages = [];
            const showEllipsisStart = currentPage > 3;
            const showEllipsisEnd = currentPage < totalPages - 2;

            if (showEllipsisStart) {
                pages.push(1);
            }

            for (
                let i = Math.max(1, currentPage - 1);
                i <= Math.min(totalPages, currentPage + 1);
                i++
            ) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (showEllipsisEnd && !pages.includes(totalPages)) {
                pages.push(totalPages);
            }

            return pages;
        };

        return (
            <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </p>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationButton
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                size="default"
                            >
                                Previous
                            </PaginationButton>
                        </PaginationItem>

                        {getPageNumbers().map((page, index, arr) => (
                            <PaginationItem key={page}>
                                {index > 0 && arr[index - 1] !== page - 1 && (
                                    <PaginationEllipsis />
                                )}
                                <PaginationButton
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationButton>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationButton
                                onClick={() =>
                                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                                }
                                disabled={currentPage === totalPages}
                                size="default"
                            >
                                Next
                            </PaginationButton>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        );
    },
};

/**
 * Simple previous/next only.
 */
export const Simple: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
};

/**
 * Compact pagination for mobile.
 */
export const Compact: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(5);
        const totalPages = 20;

        return (
            <div className="flex items-center justify-between px-4 py-3 border rounded-lg">
                <button
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    ← Previous
                </button>
                <span className="text-sm">
                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
                <button
                    className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next →
                </button>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { useState } from "react";

const [currentPage, setCurrentPage] = useState(5);
const totalPages = 20;

<div className="flex items-center justify-between px-4 py-3 border rounded-lg">
  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
    ← Previous
  </button>
  <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
    Next →
  </button>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex justify-content-between align-items-center p-3 border rounded">
    <button class="btn btn-sm" @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1">
      ← Previous
    </button>
    <span class="text-muted">Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong></span>
    <button class="btn btn-sm" @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages">
      Next →
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return { currentPage: 5, totalPages: 20 };
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center justify-between px-4 py-3 border rounded-lg">
    <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1">
      ← Previous
    </button>
    <span>Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong></span>
    <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages">
      Next →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentPage = ref(5);
const totalPages = 20;
</script>`,
        },
    },
};

/**
 * Pagination with page size selector.
 */
export const WithPageSize: Story = {
    render: () => {
        const [pageSize, setPageSize] = useState(10);
        const [currentPage, setCurrentPage] = useState(1);
        const totalItems = 247;
        const totalPages = Math.ceil(totalItems / pageSize);

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show</span>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border rounded px-2 py-1 text-sm"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-muted-foreground">per page</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * pageSize + 1} -{" "}
                        {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
                    </span>
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationButton
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                ««
                            </PaginationButton>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationButton
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                «
                            </PaginationButton>
                        </PaginationItem>

                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const page = currentPage - 2 + i;
                            if (page < 1 || page > totalPages) return null;
                            return (
                                <PaginationItem key={page}>
                                    <PaginationButton
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationButton>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationButton
                                onClick={() =>
                                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                                }
                                disabled={currentPage === totalPages}
                            >
                                »
                            </PaginationButton>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationButton
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                »»
                            </PaginationButton>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        );
    },
};

/**
 * Outline variant.
 */
export const OutlineVariant: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href="#" variant="outline" size="default">
                        Previous
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" variant="outline">
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" variant="outline" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" variant="outline">
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" variant="outline" size="default">
                        Next
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
};
