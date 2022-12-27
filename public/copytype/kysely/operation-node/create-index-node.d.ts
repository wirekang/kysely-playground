import { IdentifierNode } from './identifier-node.js';
import { OperationNode } from './operation-node.js';
import { RawNode } from './raw-node.js';
import { TableNode } from './table-node.js';
export declare type CreateIndexNodeProps = Omit<CreateIndexNode, 'kind' | 'name'>;
export declare type IndexType = 'btree' | 'hash' | 'gist' | 'gin';
export interface CreateIndexNode extends OperationNode {
    readonly kind: 'CreateIndexNode';
    readonly name: IdentifierNode;
    readonly table?: TableNode;
    readonly expression?: OperationNode;
    readonly unique?: boolean;
    readonly using?: RawNode;
}
/**
 * @internal
 */
export declare const CreateIndexNode: Readonly<{
    is(node: OperationNode): node is CreateIndexNode;
    create(name: string): CreateIndexNode;
    cloneWith(node: CreateIndexNode, props: CreateIndexNodeProps): CreateIndexNode;
}>;
