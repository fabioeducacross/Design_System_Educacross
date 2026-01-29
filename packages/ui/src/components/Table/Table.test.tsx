import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "./Table";

describe("Table", () => {
    describe("Renderização", () => {
        it("deve renderizar elemento table", () => {
            render(
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Cell</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
            expect(screen.getByRole("table")).toBeInTheDocument();
        });

        it("deve aplicar classes de estilo", () => {
            render(
                <Table data-testid="table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Cell</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
            expect(screen.getByRole("table")).toHaveClass("w-full", "text-sm");
        });

        it("deve estar envolvido em container com overflow", () => {
            const { container } = render(
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Cell</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
            const wrapper = container.querySelector(".overflow-auto");
            expect(wrapper).toBeInTheDocument();
        });

        it("deve suportar ref", () => {
            const ref = { current: null as HTMLTableElement | null };
            render(
                <Table ref={ref}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Cell</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
            expect(ref.current).toBeInstanceOf(HTMLTableElement);
        });

        it("deve suportar className customizado", () => {
            render(
                <Table className="custom-table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Cell</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
            expect(screen.getByRole("table")).toHaveClass("custom-table");
        });
    });
});

describe("TableHeader", () => {
    it("deve renderizar thead", () => {
        render(
            <Table>
                <TableHeader data-testid="header">
                    <TableRow>
                        <TableHead>Header</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        );
        expect(screen.getByTestId("header").tagName).toBe("THEAD");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableSectionElement | null };
        render(
            <Table>
                <TableHeader ref={ref}>
                    <TableRow>
                        <TableHead>Header</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });
});

describe("TableBody", () => {
    it("deve renderizar tbody", () => {
        render(
            <Table>
                <TableBody data-testid="body">
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByTestId("body").tagName).toBe("TBODY");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableSectionElement | null };
        render(
            <Table>
                <TableBody ref={ref}>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });
});

describe("TableFooter", () => {
    it("deve renderizar tfoot", () => {
        render(
            <Table>
                <TableFooter data-testid="footer">
                    <TableRow>
                        <TableCell>Footer</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
        expect(screen.getByTestId("footer").tagName).toBe("TFOOT");
    });

    it("deve aplicar classes de estilo", () => {
        render(
            <Table>
                <TableFooter data-testid="footer">
                    <TableRow>
                        <TableCell>Footer</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
        expect(screen.getByTestId("footer")).toHaveClass("border-t", "bg-muted/50");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableSectionElement | null };
        render(
            <Table>
                <TableFooter ref={ref}>
                    <TableRow>
                        <TableCell>Footer</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });
});

describe("TableRow", () => {
    it("deve renderizar tr", () => {
        render(
            <Table>
                <TableBody>
                    <TableRow data-testid="row">
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByTestId("row").tagName).toBe("TR");
    });

    it("deve aplicar classes de hover", () => {
        render(
            <Table>
                <TableBody>
                    <TableRow data-testid="row">
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByTestId("row")).toHaveClass("hover:bg-muted/20");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableRowElement | null };
        render(
            <Table>
                <TableBody>
                    <TableRow ref={ref}>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
    });
});

describe("TableHead", () => {
    it("deve renderizar th", () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Header Cell</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        );
        expect(screen.getByRole("columnheader")).toHaveTextContent("Header Cell");
    });

    it("deve aplicar classes de estilo", () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead data-testid="head">Header</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        );
        expect(screen.getByTestId("head")).toHaveClass(
            "font-semibold",
            "text-muted-foreground"
        );
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableCellElement | null };
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead ref={ref}>Header</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
});

describe("TableCell", () => {
    it("deve renderizar td", () => {
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Data Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByRole("cell")).toHaveTextContent("Data Cell");
    });

    it("deve aplicar padding", () => {
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell data-testid="cell">Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByTestId("cell")).toHaveClass("px-6", "py-4");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableCellElement | null };
        render(
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell ref={ref}>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
    });
});

describe("TableCaption", () => {
    it("deve renderizar caption", () => {
        render(
            <Table>
                <TableCaption>Table description</TableCaption>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByText("Table description")).toBeInTheDocument();
    });

    it("deve aplicar classes de estilo", () => {
        render(
            <Table>
                <TableCaption data-testid="caption">Caption</TableCaption>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(screen.getByTestId("caption")).toHaveClass(
            "text-sm",
            "text-muted-foreground"
        );
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLTableCaptionElement | null };
        render(
            <Table>
                <TableCaption ref={ref}>Caption</TableCaption>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableCaptionElement);
    });
});

describe("Composição completa", () => {
    it("deve renderizar tabela completa com todos os sub-componentes", () => {
        render(
            <Table>
                <TableCaption>Lista de usuários</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>João</TableCell>
                        <TableCell>joao@email.com</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Maria</TableCell>
                        <TableCell>maria@email.com</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total: 2 usuários</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );

        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByText("Lista de usuários")).toBeInTheDocument();
        expect(screen.getAllByRole("columnheader")).toHaveLength(2);
        expect(screen.getByText("João")).toBeInTheDocument();
        expect(screen.getByText("maria@email.com")).toBeInTheDocument();
        expect(screen.getByText("Total: 2 usuários")).toBeInTheDocument();
    });
});
