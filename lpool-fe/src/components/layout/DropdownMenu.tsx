import Link from "next/link";

export default function Dropdown(props: any) {

    const { id, className, items } = props;

    return (
        <div id={id} className={className}>
            {items.map((item: any, index:number) => {
                return (
                    <Link href={item.route + item.reference} key={index}>
                        {item.title}
                    </Link>
                );
            })}
        </div>
    );
}
