declare type OperationNodeKind = 'IdentifierNode' | 'SchemableIdentifierNode' | 'RawNode' | 'SelectQueryNode' | 'SelectionNode' | 'ReferenceNode' | 'ColumnNode' | 'TableNode' | 'AliasNode' | 'FromNode' | 'SelectAllNode' | 'AndNode' | 'OrNode' | 'ParensNode' | 'ValueNode' | 'ValueListNode' | 'PrimitiveValueListNode' | 'JoinNode' | 'OperatorNode' | 'WhereNode' | 'InsertQueryNode' | 'DeleteQueryNode' | 'ReturningNode' | 'CreateTableNode' | 'ColumnDefinitionNode' | 'AddColumnNode' | 'DropTableNode' | 'DataTypeNode' | 'OrderByNode' | 'OrderByItemNode' | 'GroupByNode' | 'GroupByItemNode' | 'UpdateQueryNode' | 'ColumnUpdateNode' | 'LimitNode' | 'OffsetNode' | 'OnConflictNode' | 'OnDuplicateKeyNode' | 'CreateIndexNode' | 'DropIndexNode' | 'ListNode' | 'ReferencesNode' | 'PrimaryKeyConstraintNode' | 'UniqueConstraintNode' | 'CheckConstraintNode' | 'ForeignKeyConstraintNode' | 'WithNode' | 'CommonTableExpressionNode' | 'HavingNode' | 'CreateSchemaNode' | 'DropSchemaNode' | 'AlterTableNode' | 'ModifyColumnNode' | 'DropColumnNode' | 'RenameColumnNode' | 'AlterColumnNode' | 'AddConstraintNode' | 'DropConstraintNode' | 'CreateViewNode' | 'DropViewNode' | 'GeneratedNode' | 'DefaultValueNode' | 'OnNode' | 'ValuesNode' | 'CommonTableExpressionNameNode' | 'SelectModifierNode' | 'CreateTypeNode' | 'DropTypeNode' | 'ExplainNode' | 'DefaultInsertValueNode' | 'AggregateFunctionNode' | 'OverNode' | 'PartitionByNode' | 'PartitionByItemNode' | 'SetOperationNode' | 'BinaryOperationNode' | 'UnaryOperationNode';
interface OperationNode {
    readonly kind: OperationNodeKind;
}

interface AliasNode extends OperationNode {
    readonly kind: 'AliasNode';
    readonly node: OperationNode;
    readonly alias: OperationNode;
}
/**
 * @internal
 */
declare const AliasNode: Readonly<{
    is(node: OperationNode): node is AliasNode;
    create(node: OperationNode, alias: OperationNode): AliasNode;
}>;

interface IdentifierNode extends OperationNode {
    readonly kind: 'IdentifierNode';
    readonly name: string;
}
/**
 * @internal
 */
declare const IdentifierNode: Readonly<{
    is(node: OperationNode): node is IdentifierNode;
    create(name: string): IdentifierNode;
}>;

interface CheckConstraintNode extends OperationNode {
    readonly kind: 'CheckConstraintNode';
    readonly expression: OperationNode;
    readonly name?: IdentifierNode;
}
/**
 * @internal
 */
declare const CheckConstraintNode: Readonly<{
    is(node: OperationNode): node is CheckConstraintNode;
    create(expression: OperationNode, constraintName?: string): CheckConstraintNode;
}>;

interface ColumnNode extends OperationNode {
    readonly kind: 'ColumnNode';
    readonly column: IdentifierNode;
}
/**
 * @internal
 */
declare const ColumnNode: Readonly<{
    is(node: OperationNode): node is ColumnNode;
    create(column: string): ColumnNode;
}>;

interface DefaultValueNode extends OperationNode {
    readonly kind: 'DefaultValueNode';
    readonly defaultValue: OperationNode;
}
/**
 * @internal
 */
declare const DefaultValueNode: Readonly<{
    is(node: OperationNode): node is DefaultValueNode;
    create(defaultValue: OperationNode): DefaultValueNode;
}>;

declare type GeneratedNodeParams = Omit<GeneratedNode, 'kind' | 'expression'>;
interface GeneratedNode extends OperationNode {
    readonly kind: 'GeneratedNode';
    readonly byDefault?: boolean;
    readonly always?: boolean;
    readonly identity?: boolean;
    readonly stored?: boolean;
    readonly expression?: OperationNode;
}
/**
 * @internal
 */
declare const GeneratedNode: Readonly<{
    is(node: OperationNode): node is GeneratedNode;
    create(params: GeneratedNodeParams): GeneratedNode;
    createWithExpression(expression: OperationNode): GeneratedNode;
    cloneWith(node: GeneratedNode, params: GeneratedNodeParams): GeneratedNode;
}>;

interface SchemableIdentifierNode extends OperationNode {
    readonly kind: 'SchemableIdentifierNode';
    readonly schema?: IdentifierNode;
    readonly identifier: IdentifierNode;
}
/**
 * @internal
 */
declare const SchemableIdentifierNode: Readonly<{
    is(node: OperationNode): node is SchemableIdentifierNode;
    create(identifier: string): SchemableIdentifierNode;
    createWithSchema(schema: string, identifier: string): SchemableIdentifierNode;
}>;

interface TableNode extends OperationNode {
    readonly kind: 'TableNode';
    readonly table: SchemableIdentifierNode;
}
/**
 * @internal
 */
declare const TableNode: Readonly<{
    is(node: OperationNode): node is TableNode;
    create(table: string): TableNode;
    createWithSchema(schema: string, table: string): TableNode;
}>;

declare const ON_MODIFY_FOREIGN_ACTIONS: readonly ["no action", "restrict", "cascade", "set null", "set default"];
declare type OnModifyForeignAction = ArrayItemType<typeof ON_MODIFY_FOREIGN_ACTIONS>;
interface ReferencesNode extends OperationNode {
    readonly kind: 'ReferencesNode';
    readonly table: TableNode;
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly onDelete?: OnModifyForeignAction;
    readonly onUpdate?: OnModifyForeignAction;
}
/**
 * @internal
 */
declare const ReferencesNode: Readonly<{
    is(node: OperationNode): node is ReferencesNode;
    create(table: TableNode, columns: ReadonlyArray<ColumnNode>): ReferencesNode;
    cloneWithOnDelete(references: ReferencesNode, onDelete: OnModifyForeignAction): ReferencesNode;
    cloneWithOnUpdate(references: ReferencesNode, onUpdate: OnModifyForeignAction): ReferencesNode;
}>;

declare type ColumnDefinitionNodeProps = Omit<Partial<ColumnDefinitionNode>, 'kind' | 'dataType'>;
interface ColumnDefinitionNode extends OperationNode {
    readonly kind: 'ColumnDefinitionNode';
    readonly column: ColumnNode;
    readonly dataType: OperationNode;
    readonly references?: ReferencesNode;
    readonly primaryKey?: boolean;
    readonly autoIncrement?: boolean;
    readonly unique?: boolean;
    readonly notNull?: boolean;
    readonly defaultTo?: DefaultValueNode;
    readonly check?: CheckConstraintNode;
    readonly generated?: GeneratedNode;
    readonly unsigned?: boolean;
    readonly frontModifiers?: ReadonlyArray<OperationNode>;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const ColumnDefinitionNode: Readonly<{
    is(node: OperationNode): node is ColumnDefinitionNode;
    create(column: string, dataType: OperationNode): ColumnDefinitionNode;
    cloneWithFrontModifier(node: ColumnDefinitionNode, modifier: OperationNode): ColumnDefinitionNode;
    cloneWithEndModifier(node: ColumnDefinitionNode, modifier: OperationNode): ColumnDefinitionNode;
    cloneWith(node: ColumnDefinitionNode, props: ColumnDefinitionNodeProps): ColumnDefinitionNode;
}>;

interface AddColumnNode extends OperationNode {
    readonly kind: 'AddColumnNode';
    readonly column: ColumnDefinitionNode;
}
/**
 * @internal
 */
declare const AddColumnNode: Readonly<{
    is(node: OperationNode): node is AddColumnNode;
    create(column: ColumnDefinitionNode): AddColumnNode;
}>;

interface DropColumnNode extends OperationNode {
    readonly kind: 'DropColumnNode';
    readonly column: ColumnNode;
}
/**
 * @internal
 */
declare const DropColumnNode: Readonly<{
    is(node: OperationNode): node is DropColumnNode;
    create(column: string): DropColumnNode;
}>;

interface RenameColumnNode extends OperationNode {
    readonly kind: 'RenameColumnNode';
    readonly column: ColumnNode;
    readonly renameTo: ColumnNode;
}
/**
 * @internal
 */
declare const RenameColumnNode: Readonly<{
    is(node: OperationNode): node is RenameColumnNode;
    create(column: string, newColumn: string): RenameColumnNode;
}>;

declare type ColumnDataType = 'varchar' | `varchar(${number})` | 'text' | 'integer' | 'int2' | 'int4' | 'int8' | 'bigint' | 'boolean' | 'real' | 'double precision' | 'float4' | 'float8' | 'decimal' | `decimal(${number}, ${number})` | 'numeric' | `numeric(${number}, ${number})` | 'binary' | 'date' | 'datetime' | `datetime(${number})` | 'time' | `time(${number})` | 'timetz' | `timetz(${number})` | 'timestamp' | `timestamp(${number})` | 'timestamptz' | `timestamptz(${number})` | 'serial' | 'bigserial' | 'uuid' | 'json' | 'jsonb' | 'blob';
declare type DataTypeParams = Omit<DataTypeNode, 'kind' | 'dataType'>;
interface DataTypeNode extends OperationNode {
    readonly kind: 'DataTypeNode';
    readonly dataType: ColumnDataType;
}
/**
 * @internal
 */
declare const DataTypeNode: Readonly<{
    is(node: OperationNode): node is DataTypeNode;
    create(dataType: ColumnDataType): DataTypeNode;
}>;

interface RawNode extends OperationNode {
    readonly kind: 'RawNode';
    readonly sqlFragments: ReadonlyArray<string>;
    readonly parameters: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const RawNode: Readonly<{
    is(node: OperationNode): node is RawNode;
    create(sqlFragments: ReadonlyArray<string>, parameters: ReadonlyArray<OperationNode>): RawNode;
    createWithSql(sql: string): RawNode;
    createWithChild(child: OperationNode): RawNode;
    createWithChildren(children: ReadonlyArray<OperationNode>): RawNode;
}>;

declare type AlterColumnNodeProps = Omit<AlterColumnNode, 'kind' | 'column'>;
interface AlterColumnNode extends OperationNode {
    readonly kind: 'AlterColumnNode';
    readonly column: ColumnNode;
    readonly dataType?: DataTypeNode;
    readonly dataTypeExpression?: RawNode;
    readonly setDefault?: OperationNode;
    readonly dropDefault?: true;
    readonly setNotNull?: true;
    readonly dropNotNull?: true;
}
/**
 * @internal
 */
declare const AlterColumnNode: Readonly<{
    is(node: OperationNode): node is AlterColumnNode;
    create(column: string): AlterColumnNode;
    cloneWith(node: AlterColumnNode, props: AlterColumnNodeProps): AlterColumnNode;
}>;

declare type ForeignKeyConstraintNodeProps = Omit<ForeignKeyConstraintNode, 'kind' | 'columns' | 'references'>;
interface ForeignKeyConstraintNode extends OperationNode {
    readonly kind: 'ForeignKeyConstraintNode';
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly references: ReferencesNode;
    readonly onDelete?: OnModifyForeignAction;
    readonly onUpdate?: OnModifyForeignAction;
    readonly name?: IdentifierNode;
}
/**
 * @internal
 */
declare const ForeignKeyConstraintNode: Readonly<{
    is(node: OperationNode): node is ForeignKeyConstraintNode;
    create(sourceColumns: ReadonlyArray<ColumnNode>, targetTable: TableNode, targetColumns: ReadonlyArray<ColumnNode>, constraintName?: string): ForeignKeyConstraintNode;
    cloneWith(node: ForeignKeyConstraintNode, props: ForeignKeyConstraintNodeProps): Readonly<{
        name?: IdentifierNode | undefined;
        onDelete?: "no action" | "restrict" | "cascade" | "set null" | "set default" | undefined;
        onUpdate?: "no action" | "restrict" | "cascade" | "set null" | "set default" | undefined;
        kind: 'ForeignKeyConstraintNode';
        columns: ReadonlyArray<ColumnNode>;
        references: ReferencesNode;
    }>;
}>;

interface PrimaryKeyConstraintNode extends OperationNode {
    readonly kind: 'PrimaryKeyConstraintNode';
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly name?: IdentifierNode;
}
/**
 * @internal
 */
declare const PrimaryConstraintNode: Readonly<{
    is(node: OperationNode): node is PrimaryKeyConstraintNode;
    create(columns: string[], constraintName?: string): PrimaryKeyConstraintNode;
}>;

interface UniqueConstraintNode extends OperationNode {
    readonly kind: 'UniqueConstraintNode';
    readonly columns: ReadonlyArray<ColumnNode>;
    readonly name?: IdentifierNode;
}
/**
 * @internal
 */
declare const UniqueConstraintNode: Readonly<{
    is(node: OperationNode): node is UniqueConstraintNode;
    create(columns: string[], constraintName?: string): UniqueConstraintNode;
}>;

declare type ConstraintNode = PrimaryKeyConstraintNode | UniqueConstraintNode | CheckConstraintNode | ForeignKeyConstraintNode;

interface AddConstraintNode extends OperationNode {
    readonly kind: 'AddConstraintNode';
    readonly constraint: ConstraintNode;
}
/**
 * @internal
 */
declare const AddConstraintNode: Readonly<{
    is(node: OperationNode): node is AddConstraintNode;
    create(constraint: ConstraintNode): AddConstraintNode;
}>;

declare type DropConstraintNodeProps = Omit<DropConstraintNode, 'kind' | 'constraintName'>;
interface DropConstraintNode extends OperationNode {
    readonly kind: 'DropConstraintNode';
    readonly constraintName: IdentifierNode;
    readonly ifExists?: boolean;
    readonly modifier?: 'cascade' | 'restrict';
}
/**
 * @internal
 */
declare const DropConstraintNode: Readonly<{
    is(node: OperationNode): node is DropConstraintNode;
    create(constraintName: string): DropConstraintNode;
    cloneWith(dropConstraint: DropConstraintNode, props: DropConstraintNodeProps): DropConstraintNode;
}>;

interface ModifyColumnNode extends OperationNode {
    readonly kind: 'ModifyColumnNode';
    readonly column: ColumnDefinitionNode;
}
/**
 * @internal
 */
declare const ModifyColumnNode: Readonly<{
    is(node: OperationNode): node is ModifyColumnNode;
    create(column: ColumnDefinitionNode): ModifyColumnNode;
}>;

declare type AlterTableNodeTableProps = Pick<AlterTableNode, 'renameTo' | 'setSchema' | 'addConstraint' | 'dropConstraint'>;
declare type AlterTableColumnAlterationNode = RenameColumnNode | AddColumnNode | DropColumnNode | AlterColumnNode | ModifyColumnNode;
interface AlterTableNode extends OperationNode {
    readonly kind: 'AlterTableNode';
    readonly table: TableNode;
    readonly renameTo?: TableNode;
    readonly setSchema?: IdentifierNode;
    readonly columnAlterations?: ReadonlyArray<AlterTableColumnAlterationNode>;
    readonly addConstraint?: AddConstraintNode;
    readonly dropConstraint?: DropConstraintNode;
}
/**
 * @internal
 */
declare const AlterTableNode: Readonly<{
    is(node: OperationNode): node is AlterTableNode;
    create(table: string): AlterTableNode;
    cloneWithTableProps(node: AlterTableNode, props: AlterTableNodeTableProps): AlterTableNode;
    cloneWithColumnAlteration(node: AlterTableNode, columnAlteration: AlterTableColumnAlterationNode): AlterTableNode;
}>;

declare type CreateIndexNodeProps = Omit<CreateIndexNode, 'kind' | 'name'>;
declare type IndexType = 'btree' | 'hash' | 'gist' | 'gin';
interface CreateIndexNode extends OperationNode {
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
declare const CreateIndexNode: Readonly<{
    is(node: OperationNode): node is CreateIndexNode;
    create(name: string): CreateIndexNode;
    cloneWith(node: CreateIndexNode, props: CreateIndexNodeProps): CreateIndexNode;
}>;

declare type CreateSchemaNodeParams = Omit<Partial<CreateSchemaNode>, 'kind' | 'schema'>;
interface CreateSchemaNode extends OperationNode {
    readonly kind: 'CreateSchemaNode';
    readonly schema: IdentifierNode;
    readonly ifNotExists?: boolean;
}
/**
 * @internal
 */
declare const CreateSchemaNode: Readonly<{
    is(node: OperationNode): node is CreateSchemaNode;
    create(schema: string, params?: CreateSchemaNodeParams): CreateSchemaNode;
    cloneWith(createSchema: CreateSchemaNode, params: CreateSchemaNodeParams): CreateSchemaNode;
}>;

declare const ON_COMMIT_ACTIONS: string[];
declare type OnCommitAction = ArrayItemType<typeof ON_COMMIT_ACTIONS>;
declare type CreateTableNodeParams = Omit<CreateTableNode, 'kind' | 'table' | 'columns' | 'constraints' | 'frontModifiers' | 'endModifiers'>;
interface CreateTableNode extends OperationNode {
    readonly kind: 'CreateTableNode';
    readonly table: TableNode;
    readonly columns: ReadonlyArray<ColumnDefinitionNode>;
    readonly constraints?: ReadonlyArray<ConstraintNode>;
    readonly temporary?: boolean;
    readonly ifNotExists?: boolean;
    readonly onCommit?: OnCommitAction;
    readonly frontModifiers?: ReadonlyArray<OperationNode>;
    readonly endModifiers?: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const CreateTableNode: Readonly<{
    is(node: OperationNode): node is CreateTableNode;
    create(table: TableNode): CreateTableNode;
    cloneWithColumn(createTable: CreateTableNode, column: ColumnDefinitionNode): CreateTableNode;
    cloneWithConstraint(createTable: CreateTableNode, constraint: ConstraintNode): CreateTableNode;
    cloneWithFrontModifier(createTable: CreateTableNode, modifier: OperationNode): CreateTableNode;
    cloneWithEndModifier(createTable: CreateTableNode, modifier: OperationNode): CreateTableNode;
    cloneWith(createTable: CreateTableNode, params: CreateTableNodeParams): CreateTableNode;
}>;

interface ValueListNode extends OperationNode {
    readonly kind: 'ValueListNode';
    readonly values: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const ValueListNode: Readonly<{
    is(node: OperationNode): node is ValueListNode;
    create(values: ReadonlyArray<OperationNode>): ValueListNode;
}>;

declare type CreateTypeNodeParams = Omit<Partial<CreateTypeNode>, 'kind'>;
interface CreateTypeNode extends OperationNode {
    readonly kind: 'CreateTypeNode';
    readonly name: SchemableIdentifierNode;
    readonly enum?: ValueListNode;
}
/**
 * @internal
 */
declare const CreateTypeNode: Readonly<{
    is(node: OperationNode): node is CreateTypeNode;
    create(name: SchemableIdentifierNode): CreateTypeNode;
    cloneWithEnum(createType: CreateTypeNode, values: string[]): CreateTypeNode;
}>;

interface FromNode extends OperationNode {
    readonly kind: 'FromNode';
    readonly froms: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const FromNode: Readonly<{
    is(node: OperationNode): node is FromNode;
    create(froms: ReadonlyArray<OperationNode>): FromNode;
    cloneWithFroms(from: FromNode, froms: ReadonlyArray<OperationNode>): FromNode;
}>;

interface GroupByItemNode extends OperationNode {
    readonly kind: 'GroupByItemNode';
    readonly groupBy: OperationNode;
}
/**
 * @internal
 */
declare const GroupByItemNode: Readonly<{
    is(node: OperationNode): node is GroupByItemNode;
    create(groupBy: OperationNode): GroupByItemNode;
}>;

interface GroupByNode extends OperationNode {
    readonly kind: 'GroupByNode';
    readonly items: ReadonlyArray<GroupByItemNode>;
}
/**
 * @internal
 */
declare const GroupByNode: Readonly<{
    is(node: OperationNode): node is GroupByNode;
    create(items: ReadonlyArray<GroupByItemNode>): GroupByNode;
    cloneWithItems(groupBy: GroupByNode, items: ReadonlyArray<GroupByItemNode>): GroupByNode;
}>;

interface HavingNode extends OperationNode {
    readonly kind: 'HavingNode';
    readonly having: OperationNode;
}
/**
 * @internal
 */
declare const HavingNode: Readonly<{
    is(node: OperationNode): node is HavingNode;
    create(filter: OperationNode): HavingNode;
    cloneWithOperation(havingNode: HavingNode, operator: 'And' | 'Or', operation: OperationNode): HavingNode;
}>;

interface OnNode extends OperationNode {
    readonly kind: 'OnNode';
    readonly on: OperationNode;
}
/**
 * @internal
 */
declare const OnNode: Readonly<{
    is(node: OperationNode): node is OnNode;
    create(filter: OperationNode): OnNode;
    cloneWithOperation(onNode: OnNode, operator: 'And' | 'Or', operation: OperationNode): OnNode;
}>;

declare type JoinType = 'InnerJoin' | 'LeftJoin' | 'RightJoin' | 'FullJoin' | 'LateralInnerJoin' | 'LateralLeftJoin';
interface JoinNode extends OperationNode {
    readonly kind: 'JoinNode';
    readonly joinType: JoinType;
    readonly table: OperationNode;
    readonly on?: OnNode;
}
/**
 * @internal
 */
declare const JoinNode: Readonly<{
    is(node: OperationNode): node is JoinNode;
    create(joinType: JoinType, table: OperationNode): JoinNode;
    createWithOn(joinType: JoinType, table: OperationNode, on: OperationNode): JoinNode;
    cloneWithOn(joinNode: JoinNode, operation: OperationNode): JoinNode;
    cloneWithOrOn(joinNode: JoinNode, operation: OperationNode): JoinNode;
}>;

interface ValueNode extends OperationNode {
    readonly kind: 'ValueNode';
    readonly value: unknown;
    readonly immediate?: boolean;
}
/**
 * @internal
 */
declare const ValueNode: Readonly<{
    is(node: OperationNode): node is ValueNode;
    create(value: unknown): ValueNode;
    createImmediate(value: unknown): ValueNode;
}>;

interface LimitNode extends OperationNode {
    readonly kind: 'LimitNode';
    readonly limit: ValueNode;
}
/**
 * @internal
 */
declare const LimitNode: Readonly<{
    is(node: OperationNode): node is LimitNode;
    create(limit: number): LimitNode;
}>;

interface OffsetNode extends OperationNode {
    readonly kind: 'OffsetNode';
    readonly offset: ValueNode;
}
/**
 * @internal
 */
declare const OffsetNode: Readonly<{
    is(node: OperationNode): node is OffsetNode;
    create(offset: number): OffsetNode;
}>;

interface OrderByItemNode extends OperationNode {
    readonly kind: 'OrderByItemNode';
    readonly orderBy: OperationNode;
    readonly direction?: OperationNode;
}
/**
 * @internal
 */
declare const OrderByItemNode: Readonly<{
    is(node: OperationNode): node is OrderByItemNode;
    create(orderBy: OperationNode, direction?: OperationNode): OrderByItemNode;
}>;

interface OrderByNode extends OperationNode {
    readonly kind: 'OrderByNode';
    readonly items: ReadonlyArray<OrderByItemNode>;
}
/**
 * @internal
 */
declare const OrderByNode: Readonly<{
    is(node: OperationNode): node is OrderByNode;
    create(item: OrderByItemNode): OrderByNode;
    cloneWithItem(orderBy: OrderByNode, item: OrderByItemNode): OrderByNode;
}>;

interface SelectAllNode extends OperationNode {
    readonly kind: 'SelectAllNode';
}
/**
 * @internal
 */
declare const SelectAllNode: Readonly<{
    is(node: OperationNode): node is SelectAllNode;
    create(): SelectAllNode;
}>;

interface ReferenceNode extends OperationNode {
    readonly kind: 'ReferenceNode';
    readonly table: TableNode;
    readonly column: ColumnNode | SelectAllNode;
}
/**
 * @internal
 */
declare const ReferenceNode: Readonly<{
    is(node: OperationNode): node is ReferenceNode;
    create(table: TableNode, column: ColumnNode): ReferenceNode;
    createSelectAll(table: TableNode): ReferenceNode;
}>;

declare type SimpleReferenceExpressionNode = ColumnNode | ReferenceNode;

declare type SelectionNodeChild = SimpleReferenceExpressionNode | AliasNode | SelectAllNode;
interface SelectionNode extends OperationNode {
    readonly kind: 'SelectionNode';
    readonly selection: SelectionNodeChild;
}
/**
 * @internal
 */
declare const SelectionNode: Readonly<{
    is(node: OperationNode): node is SelectionNode;
    create(selection: SelectionNodeChild): SelectionNode;
    createSelectAll(): SelectionNode;
    createSelectAllFromTable(table: TableNode): SelectionNode;
}>;

interface WhereNode extends OperationNode {
    readonly kind: 'WhereNode';
    readonly where: OperationNode;
}
/**
 * @internal
 */
declare const WhereNode: Readonly<{
    is(node: OperationNode): node is WhereNode;
    create(filter: OperationNode): WhereNode;
    cloneWithOperation(whereNode: WhereNode, operator: 'And' | 'Or', operation: OperationNode): WhereNode;
}>;

interface CommonTableExpressionNameNode extends OperationNode {
    readonly kind: 'CommonTableExpressionNameNode';
    readonly table: TableNode;
    readonly columns?: ReadonlyArray<ColumnNode>;
}
/**
 * @internal
 */
declare const CommonTableExpressionNameNode: Readonly<{
    is(node: OperationNode): node is CommonTableExpressionNameNode;
    create(tableName: string, columnNames?: ReadonlyArray<string>): CommonTableExpressionNameNode;
}>;

interface CommonTableExpressionNode extends OperationNode {
    readonly kind: 'CommonTableExpressionNode';
    readonly name: CommonTableExpressionNameNode;
    readonly expression: OperationNode;
}
/**
 * @internal
 */
declare const CommonTableExpressionNode: Readonly<{
    is(node: OperationNode): node is CommonTableExpressionNode;
    create(name: CommonTableExpressionNameNode, expression: OperationNode): CommonTableExpressionNode;
}>;

declare type WithNodeParams = Omit<WithNode, 'kind' | 'expressions'>;
interface WithNode extends OperationNode {
    readonly kind: 'WithNode';
    readonly expressions: ReadonlyArray<CommonTableExpressionNode>;
    readonly recursive?: boolean;
}
/**
 * @internal
 */
declare const WithNode: Readonly<{
    is(node: OperationNode): node is WithNode;
    create(expression: CommonTableExpressionNode, params?: WithNodeParams): WithNode;
    cloneWithExpression(withNode: WithNode, expression: CommonTableExpressionNode): WithNode;
}>;

declare type SelectModifier = 'ForUpdate' | 'ForNoKeyUpdate' | 'ForShare' | 'ForKeyShare' | 'NoWait' | 'SkipLocked' | 'Distinct';
interface SelectModifierNode extends OperationNode {
    readonly kind: 'SelectModifierNode';
    readonly modifier?: SelectModifier;
    readonly rawModifier?: OperationNode;
}
/**
 * @internal
 */
declare const SelectModifierNode: Readonly<{
    is(node: OperationNode): node is SelectModifierNode;
    create(modifier: SelectModifier): SelectModifierNode;
    createWithExpression(modifier: OperationNode): SelectModifierNode;
}>;

interface OperationNodeSource {
    toOperationNode(): OperationNode;
}
declare function isOperationNodeSource(obj: unknown): obj is OperationNodeSource;

/**
 * `Expression` represents an arbitrary SQL expression with a type.
 *
 * Most Kysely methods accept instances of `Expression` and most classes like `SelectQueryBuilder`
 * and the return value of the {@link sql} template tag implement it.
 *
 * ```ts
 * const exp1: Expression<string> = sql<string>`CONCAT('hello', ' ', 'world')`
 * const exp2: Expression<{ first_name: string }> = db.selectFrom('person').select('first_name')
 * ```
 *
 * You can implement the `Expression` interface to create your own type-safe utilities for Kysely.
 */
interface Expression<T> extends OperationNodeSource {
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): T | undefined;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): OperationNode;
}
/**
 * Just like `Expression<T>` but also holds an alias type `A`.
 *
 * `AliasedExpression<T, A>` can be used in places where, in addition to the value type `T`, you
 * also need a name `A` for that value. For example anything you can pass into the `select` method
 * needs to implement an `AliasedExpression<T, A>`. `A` becomes the name of the selected expression
 * in the result and `T` becomes its type.
 *
 * @example
 *
 * ```ts
 * class SomeAliasedExpression<T, A extends string> implements AliasedExpression<T, A> {
 *   #expression: Expression<T>
 *   #alias: A
 *
 *   constructor(expression: Expression<T>, alias: A) {
 *     this.#expression = expression
 *     this.#alias = alias
 *   }
 *
 *   get expression(): Expression<T> {
 *     return this.#expression
 *   }
 *
 *   get alias(): A {
 *     return this.#alias
 *   }
 *
 *   toOperationNode(): AliasNode {
 *     return AliasNode.create(this.#expression.toOperationNode(), IdentifierNode.create(this.#alias))
 *   }
 * }
 * ```
 */
interface AliasedExpression<T, A extends string> extends OperationNodeSource {
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<T>;
    /**
     * Returns the alias.
     */
    get alias(): A;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
declare function isExpression(obj: unknown): obj is Expression<any>;
declare function isAliasedExpression(obj: unknown): obj is AliasedExpression<any, any>;

declare type ExplainFormat = 'text' | 'xml' | 'json' | 'yaml' | 'traditional' | 'tree';
interface Explainable {
    explain<O extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<O[]>;
}

interface ExplainNode extends OperationNode {
    readonly kind: 'ExplainNode';
    readonly format?: ExplainFormat;
    readonly options?: OperationNode;
}
/**
 * @internal
 */
declare const ExplainNode: Readonly<{
    is(node: OperationNode): node is ExplainNode;
    create(format?: ExplainFormat, options?: OperationNode): ExplainNode;
}>;

declare type SetOperator = 'union' | 'intersect' | 'except';
interface SetOperationNode extends OperationNode {
    kind: 'SetOperationNode';
    operator: SetOperator;
    expression: OperationNode;
    all: boolean;
}
/**
 * @internal
 */
declare const SetOperationNode: Readonly<{
    is(node: OperationNode): node is SetOperationNode;
    create(operator: SetOperator, expression: OperationNode, all: boolean): SetOperationNode;
}>;

interface SelectQueryNode extends OperationNode {
    readonly kind: 'SelectQueryNode';
    readonly from: FromNode;
    readonly selections?: ReadonlyArray<SelectionNode>;
    readonly distinctOn?: ReadonlyArray<OperationNode>;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly groupBy?: GroupByNode;
    readonly orderBy?: OrderByNode;
    readonly where?: WhereNode;
    readonly frontModifiers?: ReadonlyArray<SelectModifierNode>;
    readonly endModifiers?: ReadonlyArray<SelectModifierNode>;
    readonly limit?: LimitNode;
    readonly offset?: OffsetNode;
    readonly with?: WithNode;
    readonly having?: HavingNode;
    readonly explain?: ExplainNode;
    readonly setOperations?: ReadonlyArray<SetOperationNode>;
}
/**
 * @internal
 */
declare const SelectQueryNode: Readonly<{
    is(node: OperationNode): node is SelectQueryNode;
    create(fromItems: ReadonlyArray<OperationNode>, withNode?: WithNode): SelectQueryNode;
    cloneWithSelections(select: SelectQueryNode, selections: ReadonlyArray<SelectionNode>): SelectQueryNode;
    cloneWithDistinctOn(select: SelectQueryNode, expressions: ReadonlyArray<OperationNode>): SelectQueryNode;
    cloneWithFrontModifier(select: SelectQueryNode, modifier: SelectModifierNode): SelectQueryNode;
    cloneWithEndModifier(select: SelectQueryNode, modifier: SelectModifierNode): SelectQueryNode;
    cloneWithOrderByItem(selectNode: SelectQueryNode, item: OrderByItemNode): SelectQueryNode;
    cloneWithGroupByItems(selectNode: SelectQueryNode, items: ReadonlyArray<GroupByItemNode>): SelectQueryNode;
    cloneWithLimit(selectNode: SelectQueryNode, limit: LimitNode): SelectQueryNode;
    cloneWithOffset(selectNode: SelectQueryNode, offset: OffsetNode): SelectQueryNode;
    cloneWithHaving(selectNode: SelectQueryNode, operation: OperationNode): SelectQueryNode;
    cloneWithOrHaving(selectNode: SelectQueryNode, operation: OperationNode): SelectQueryNode;
    cloneWithSetOperation(selectNode: SelectQueryNode, setOperation: SetOperationNode): SelectQueryNode;
    cloneWithExplain(selectNode: SelectQueryNode, explain: ExplainNode): SelectQueryNode;
}>;

declare type CreateViewNodeParams = Omit<Partial<CreateViewNode>, 'kind' | 'name'>;
interface CreateViewNode extends OperationNode {
    readonly kind: 'CreateViewNode';
    readonly name: SchemableIdentifierNode;
    readonly temporary?: boolean;
    readonly materialized?: boolean;
    readonly orReplace?: boolean;
    readonly ifNotExists?: boolean;
    readonly columns?: ReadonlyArray<ColumnNode>;
    readonly as?: SelectQueryNode | RawNode;
}
/**
 * @internal
 */
declare const CreateViewNode: Readonly<{
    is(node: OperationNode): node is CreateViewNode;
    create(name: string): CreateViewNode;
    cloneWith(createView: CreateViewNode, params: CreateViewNodeParams): CreateViewNode;
}>;

declare type DropIndexNodeProps = Omit<DropIndexNode, 'kind' | 'name'>;
interface DropIndexNode extends OperationNode {
    readonly kind: 'DropIndexNode';
    readonly name: SchemableIdentifierNode;
    readonly table?: TableNode;
    readonly ifExists?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropIndexNode: Readonly<{
    is(node: OperationNode): node is DropIndexNode;
    create(name: string, params?: DropIndexNodeProps): DropIndexNode;
    cloneWith(dropIndex: DropIndexNode, props: DropIndexNodeProps): DropIndexNode;
}>;

declare type DropSchemaNodeParams = Omit<Partial<DropSchemaNode>, 'kind' | 'schema'>;
interface DropSchemaNode extends OperationNode {
    readonly kind: 'DropSchemaNode';
    readonly schema: IdentifierNode;
    readonly ifExists?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropSchemaNode: Readonly<{
    is(node: OperationNode): node is DropSchemaNode;
    create(schema: string, params?: DropSchemaNodeParams): DropSchemaNode;
    cloneWith(dropSchema: DropSchemaNode, params: DropSchemaNodeParams): DropSchemaNode;
}>;

declare type DropTablexNodeParams = Omit<Partial<DropTableNode>, 'kind' | 'table'>;
interface DropTableNode extends OperationNode {
    readonly kind: 'DropTableNode';
    readonly table: TableNode;
    readonly ifExists?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropTableNode: Readonly<{
    is(node: OperationNode): node is DropTableNode;
    create(table: TableNode, params?: DropTablexNodeParams): DropTableNode;
    cloneWith(dropIndex: DropTableNode, params: DropTablexNodeParams): DropTableNode;
}>;

declare type DropTypeNodeParams = Omit<Partial<DropTypeNode>, 'kind' | 'name'>;
interface DropTypeNode extends OperationNode {
    readonly kind: 'DropTypeNode';
    readonly name: SchemableIdentifierNode;
    readonly ifExists?: boolean;
}
/**
 * @internal
 */
declare const DropTypeNode: Readonly<{
    is(node: OperationNode): node is DropTypeNode;
    create(name: SchemableIdentifierNode): DropTypeNode;
    cloneWith(dropType: DropTypeNode, params: DropTypeNodeParams): DropTypeNode;
}>;

declare type DropViewNodeParams = Omit<Partial<DropViewNode>, 'kind' | 'name'>;
interface DropViewNode extends OperationNode {
    readonly kind: 'DropViewNode';
    readonly name: SchemableIdentifierNode;
    readonly ifExists?: boolean;
    readonly materialized?: boolean;
    readonly cascade?: boolean;
}
/**
 * @internal
 */
declare const DropViewNode: Readonly<{
    is(node: OperationNode): node is DropViewNode;
    create(name: string): DropViewNode;
    cloneWith(dropView: DropViewNode, params: DropViewNodeParams): DropViewNode;
}>;

interface ColumnUpdateNode extends OperationNode {
    readonly kind: 'ColumnUpdateNode';
    readonly column: ColumnNode;
    readonly value: OperationNode;
}
/**
 * @internal
 */
declare const ColumnUpdateNode: Readonly<{
    is(node: OperationNode): node is ColumnUpdateNode;
    create(column: ColumnNode, value: OperationNode): ColumnUpdateNode;
}>;

declare type OnConflictNodeProps = Omit<OnConflictNode, 'kind' | 'indexWhere' | 'updateWhere'>;
interface OnConflictNode extends OperationNode {
    readonly kind: 'OnConflictNode';
    readonly columns?: ReadonlyArray<ColumnNode>;
    readonly constraint?: IdentifierNode;
    readonly indexExpression?: OperationNode;
    readonly indexWhere?: WhereNode;
    readonly updates?: ReadonlyArray<ColumnUpdateNode>;
    readonly updateWhere?: WhereNode;
    readonly doNothing?: boolean;
}
/**
 * @internal
 */
declare const OnConflictNode: Readonly<{
    is(node: OperationNode): node is OnConflictNode;
    create(): OnConflictNode;
    cloneWith(node: OnConflictNode, props: OnConflictNodeProps): OnConflictNode;
    cloneWithIndexWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithIndexOrWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithUpdateWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
    cloneWithUpdateOrWhere(node: OnConflictNode, operation: OperationNode): OnConflictNode;
}>;

declare type OnDuplicateKeyNodeProps = Omit<OnDuplicateKeyNode, 'kind'>;
interface OnDuplicateKeyNode extends OperationNode {
    readonly kind: 'OnDuplicateKeyNode';
    readonly updates: ReadonlyArray<ColumnUpdateNode>;
}
/**
 * @internal
 */
declare const OnDuplicateKeyNode: Readonly<{
    is(node: OperationNode): node is OnDuplicateKeyNode;
    create(updates: ReadonlyArray<ColumnUpdateNode>): OnDuplicateKeyNode;
}>;

interface ReturningNode extends OperationNode {
    readonly kind: 'ReturningNode';
    readonly selections: ReadonlyArray<SelectionNode>;
}
/**
 * @internal
 */
declare const ReturningNode: Readonly<{
    is(node: OperationNode): node is ReturningNode;
    create(selections: ReadonlyArray<SelectionNode>): ReturningNode;
    cloneWithSelections(returning: ReturningNode, selections: ReadonlyArray<SelectionNode>): ReturningNode;
}>;

declare type InsertQueryNodeProps = Omit<InsertQueryNode, 'kind' | 'into'>;
interface InsertQueryNode extends OperationNode {
    readonly kind: 'InsertQueryNode';
    readonly into: TableNode;
    readonly columns?: ReadonlyArray<ColumnNode>;
    readonly values?: OperationNode;
    readonly returning?: ReturningNode;
    readonly onConflict?: OnConflictNode;
    readonly onDuplicateKey?: OnDuplicateKeyNode;
    readonly with?: WithNode;
    readonly ignore?: boolean;
    readonly replace?: boolean;
    readonly explain?: ExplainNode;
}
/**
 * @internal
 */
declare const InsertQueryNode: Readonly<{
    is(node: OperationNode): node is InsertQueryNode;
    create(into: TableNode, withNode?: WithNode, replace?: boolean): InsertQueryNode;
    cloneWith(insertQuery: InsertQueryNode, props: InsertQueryNodeProps): InsertQueryNode;
}>;

/**
 * This node is basically just a performance optimization over the normal ValueListNode.
 * The queries often contain large arrays of primitive values (for example in a `where in` list)
 * and we don't want to create a ValueNode for each item in those lists.
 */
interface PrimitiveValueListNode extends OperationNode {
    readonly kind: 'PrimitiveValueListNode';
    readonly values: ReadonlyArray<unknown>;
}
/**
 * @internal
 */
declare const PrimitiveValueListNode: Readonly<{
    is(node: OperationNode): node is PrimitiveValueListNode;
    create(values: ReadonlyArray<unknown>): PrimitiveValueListNode;
}>;

declare type UpdateValuesNode = ValueListNode | PrimitiveValueListNode;
interface UpdateQueryNode extends OperationNode {
    readonly kind: 'UpdateQueryNode';
    readonly table: OperationNode;
    readonly from?: FromNode;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly where?: WhereNode;
    readonly updates?: ReadonlyArray<ColumnUpdateNode>;
    readonly returning?: ReturningNode;
    readonly with?: WithNode;
    readonly explain?: ExplainNode;
}
/**
 * @internal
 */
declare const UpdateQueryNode: Readonly<{
    is(node: OperationNode): node is UpdateQueryNode;
    create(table: OperationNode, withNode?: WithNode): UpdateQueryNode;
    cloneWithFromItems(updateQuery: UpdateQueryNode, fromItems: ReadonlyArray<OperationNode>): UpdateQueryNode;
    cloneWithUpdates(updateQuery: UpdateQueryNode, updates: ReadonlyArray<ColumnUpdateNode>): UpdateQueryNode;
    cloneWithExplain(updateQuery: UpdateQueryNode, explain: ExplainNode): UpdateQueryNode;
}>;

interface DeleteQueryNode extends OperationNode {
    readonly kind: 'DeleteQueryNode';
    readonly from: FromNode;
    readonly joins?: ReadonlyArray<JoinNode>;
    readonly where?: WhereNode;
    readonly returning?: ReturningNode;
    readonly with?: WithNode;
    readonly orderBy?: OrderByNode;
    readonly limit?: LimitNode;
    readonly explain?: ExplainNode;
}
/**
 * @internal
 */
declare const DeleteQueryNode: Readonly<{
    is(node: OperationNode): node is DeleteQueryNode;
    create(fromItem: OperationNode, withNode?: WithNode): DeleteQueryNode;
    cloneWithOrderByItem(deleteNode: DeleteQueryNode, item: OrderByItemNode): DeleteQueryNode;
    cloneWithLimit(deleteNode: DeleteQueryNode, limit: LimitNode): DeleteQueryNode;
    cloneWithExplain(deleteNode: DeleteQueryNode, explain: ExplainNode): DeleteQueryNode;
}>;

declare type MutatingQueryNode = DeleteQueryNode | InsertQueryNode | UpdateQueryNode;
declare type FilterableQueryNode = SelectQueryNode | DeleteQueryNode | UpdateQueryNode;
declare type QueryNode = SelectQueryNode | DeleteQueryNode | InsertQueryNode | UpdateQueryNode;
/**
 * @internal
 */
declare const QueryNode: Readonly<{
    is(node: OperationNode): node is QueryNode;
    cloneWithWhere<T extends FilterableQueryNode>(node: T, operation: OperationNode): T;
    cloneWithOrWhere<T_1 extends FilterableQueryNode>(node: T_1, operation: OperationNode): T_1;
    cloneWithJoin<T_2 extends FilterableQueryNode>(node: T_2, join: JoinNode): T_2;
    cloneWithReturning<T_3 extends MutatingQueryNode>(node: T_3, selections: ReadonlyArray<SelectionNode>): T_3;
}>;

declare type RootOperationNode = QueryNode | CreateTableNode | CreateIndexNode | CreateSchemaNode | CreateViewNode | DropTableNode | DropIndexNode | DropSchemaNode | DropViewNode | AlterTableNode | RawNode | CreateTypeNode | DropTypeNode;
/**
 * a `QueryCompiler` compiles a query expressed as a tree of `OperationNodes` into SQL.
 */
interface QueryCompiler {
    compileQuery(node: RootOperationNode): CompiledQuery;
}

interface CompiledQuery<O = unknown> {
    readonly query: RootOperationNode;
    readonly sql: string;
    readonly parameters: ReadonlyArray<unknown>;
}
declare const CompiledQuery: Readonly<{
    raw(sql: string): CompiledQuery;
}>;

declare class DynamicReferenceBuilder<R extends string = never> implements OperationNodeSource {
    #private;
    get dynamicReference(): string;
    /**
     * @private
     *
     * This needs to be here just so that the typings work. Without this
     * the generated .d.ts file contains no reference to the type param R
     * which causes this type to be equal to DynamicReferenceBuilder with
     * any R.
     */
    protected get refType(): R;
    constructor(reference: string);
    toOperationNode(): SimpleReferenceExpressionNode;
}

/**
 * This type can be used to specify a different type for
 * select, insert and update operations.
 *
 * Also see the {@link Generated} type.
 *
 * ### Examples
 *
 * The next example defines a number column that is optional
 * in inserts and updates. All columns are always optional
 * in updates so therefore we don't need to specify `undefined`
 * for the update type. The type below is useful for all kinds of
 * database generated columns like identifiers. The `Generated`
 * type is actually just a shortcut for the type in this example:
 *
 * ```ts
 * ColumnType<number, number | undefined, number>
 * ```
 *
 * The above example makes the column optional in inserts
 * and updates, but you can still choose to provide the
 * column. If you want to prevent insertion/update you
 * can se the type as `never`:
 *
 * ```ts
 * ColumnType<number, never, never>
 * ```
 *
 * Here's one more example where the type is different
 * for each different operation:
 *
 * ```ts
 * ColumnType<Date, string, never>
 * ```
 */
declare type ColumnType<SelectType, InsertType = SelectType, UpdateType = SelectType> = {
    readonly __select__: SelectType;
    readonly __insert__: InsertType;
    readonly __update__: UpdateType;
};
/**
 * A shortcut for defining database-generated columns. The type
 * is the same for all selects, inserts and updates but the
 * column is optional for inserts and updates.
 *
 * The implementation:
 *
 * ```ts
 * // The update type is `S` instead of `S | undefined` because
 * // updates are always optional --> no need to specify optionality.
 * type Generated<S> = ColumnType<S, S | undefined, S>
 * ```
 */
declare type Generated<S> = ColumnType<S, S | undefined, S>;
/**
 * A shortcut for defining columns that are only database-generated
 * (like postgres GENERATED ALWAYS AS IDENTITY). No insert/update
 * is allowed.
 */
declare type GeneratedAlways<S> = ColumnType<S, never, never>;
/**
 * Evaluates to `K` if `T` can be `null` or `undefined`.
 */
declare type IfNullable<T, K> = undefined extends T ? K : null extends T ? K : never;
/**
 * Evaluates to `K` if `T` can't be `null` or `undefined`.
 */
declare type IfNotNullable<T, K> = undefined extends T ? never : null extends T ? never : T extends never ? never : K;
/**
 * Evaluates to `K` if `T` isn't `never`.
 */
declare type IfNotNever<T, K> = T extends never ? never : K;
declare type SelectType<T> = T extends ColumnType<infer S, any, any> ? S : T;
declare type InsertType<T> = T extends ColumnType<any, infer I, any> ? I : T;
declare type UpdateType<T> = T extends ColumnType<any, any, infer U> ? U : T;
/**
 * Keys of `R` whose `InsertType` values can be `null` or `undefined`.
 */
declare type NullableInsertKeys<R> = {
    [K in keyof R]: IfNullable<InsertType<R[K]>, K>;
}[keyof R];
/**
 * Keys of `R` whose `InsertType` values can't be `null` or `undefined`.
 */
declare type NonNullableInsertKeys<R> = {
    [K in keyof R]: IfNotNullable<InsertType<R[K]>, K>;
}[keyof R];
/**
 * Keys of `R` whose `SelectType` values are not `never`
 */
declare type NonNeverSelectKeys<R> = {
    [K in keyof R]: IfNotNever<SelectType<R[K]>, K>;
}[keyof R];
/**
 * Keys of `R` whose `UpdateType` values are not `never`
 */
declare type UpdateKeys<R> = {
    [K in keyof R]: IfNotNever<UpdateType<R[K]>, K>;
}[keyof R];
/**
 * Given a table interface, extracts the select type from all
 * {@link ColumnType} types.
 *
 * ### Examples
 *
 * ```ts
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   modified_at: ColumnType<Date, string, never>
 * }
 *
 * type Person = Selectable<PersonTable>
 * // {
 * //   id: number,
 * //   first_name: string
 * //   modified_at: Date
 * // }
 * ```
 */
declare type Selectable<R> = {
    [K in NonNeverSelectKeys<R>]: SelectType<R[K]>;
};
/**
 * Given a table interface, extracts the insert type from all
 * {@link ColumnType} types.
 *
 * ### Examples
 *
 * ```ts
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   modified_at: ColumnType<Date, string, never>
 * }
 *
 * type InsertablePerson = Insertable<PersonTable>
 * // {
 * //   id?: number,
 * //   first_name: string
 * //   modified_at: string
 * // }
 * ```
 */
declare type Insertable<R> = {
    [K in NonNullableInsertKeys<R>]: InsertType<R[K]>;
} & {
    [K in NullableInsertKeys<R>]?: InsertType<R[K]>;
};
/**
 * Given a table interface, extracts the update type from all
 * {@link ColumnType} types.
 *
 * ### Examples
 *
 * ```ts
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   modified_at: ColumnType<Date, string, never>
 * }
 *
 * type UpdateablePerson = Updateable<PersonTable>
 * // {
 * //   id?: number,
 * //   first_name?: string
 * // }
 * ```
 */
declare type Updateable<R> = {
    [K in UpdateKeys<R>]?: UpdateType<R[K]>;
};

declare type StringReference<DB, TB extends keyof DB> = AnyColumn<DB, TB> | AnyColumnWithTable<DB, TB>;
declare type SimpleReferenceExpression<DB, TB extends keyof DB> = StringReference<DB, TB> | DynamicReferenceBuilder<any>;
declare type ReferenceExpression<DB, TB extends keyof DB> = SimpleReferenceExpression<DB, TB> | ExpressionOrFactory<DB, TB, any>;
declare type ReferenceExpressionOrList<DB, TB extends keyof DB> = ReferenceExpression<DB, TB> | ReadonlyArray<ReferenceExpression<DB, TB>>;
declare type ExtractTypeFromReferenceExpression<DB, TB extends keyof DB, RE, DV = unknown> = RE extends string ? SelectType<ExtractTypeFromStringReference<DB, TB, RE>> : RE extends SelectQueryBuilder<any, any, infer O> ? ValueType<O> : RE extends (qb: any) => SelectQueryBuilder<any, any, infer O> ? ValueType<O> : RE extends Expression<infer O> ? O : RE extends (qb: any) => Expression<infer O> ? O : DV;
declare type ExtractTypeFromStringReference<DB, TB extends keyof DB, RE extends string, DV = unknown> = RE extends `${infer SC}.${infer T}.${infer C}` ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : RE extends `${infer T}.${infer C}` ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : RE extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, RE> : DV;

declare type CoalesceReferenceExpressionList<DB, TB extends keyof DB, RE extends unknown[], O = never> = RE extends [] ? O : RE extends [infer L, ...infer R] ? L extends ReferenceExpression<any, any> ? null extends ExtractTypeFromReferenceExpression<DB, TB, L> ? CoalesceReferenceExpressionList<DB, TB, R extends ReferenceExpression<any, any>[] ? R : never, O | ExtractTypeFromReferenceExpression<DB, TB, L>> : Exclude<O, null> | ExtractTypeFromReferenceExpression<DB, TB, L> : never : never;

/**
 * A single connection to the database engine.
 *
 * These are created by an instance of {@link Driver}.
 */
interface DatabaseConnection {
    executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>>;
    streamQuery<R>(compiledQuery: CompiledQuery, chunkSize?: number): AsyncIterableIterator<QueryResult<R>>;
}
interface QueryResult<O> {
    /**
     * @deprecated use {@link QueryResult.numAffectedRows} instead.
     */
    readonly numUpdatedOrDeletedRows?: bigint;
    /**
     * This is defined for insert, update and delete queries and contains
     * the number of rows the query inserted/updated/deleted.
     */
    readonly numAffectedRows?: bigint;
    /**
     * This is defined for insert queries on dialects that return
     * the auto incrementing primary key from an insert.
     */
    readonly insertId?: bigint;
    /**
     * The rows returned by the query. This is always defined and is
     * empty if the query returned no rows.
     */
    readonly rows: O[];
}

interface QueryId {
    readonly queryId: string;
}

interface KyselyPlugin {
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
}
interface PluginTransformQueryArgs {
    readonly queryId: QueryId;
    readonly node: RootOperationNode;
}
interface PluginTransformResultArgs {
    readonly queryId: QueryId;
    readonly result: QueryResult<UnknownRow>;
}

interface ConnectionProvider {
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
}

/**
 * A `DialectAdapter` encapsulates all differences between dialects outside
 * of `Driver` and `QueryCompiler`.
 *
 * For example, some databases support transactional DDL and therefore we want
 * to run migrations inside a transaction, while other databases don't support
 * it. For that there's a `supportsTransactionalDdl` boolean in this interface.
 */
interface DialectAdapter {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    readonly supportsTransactionalDdl: boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    readonly supportsReturning: boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MIGRATION_LOCK_TABLE}
     * created by Kysely can be used instead. {@link MIGRATION_LOCK_TABLE}
     * has two columns `id` and `is_locked` and there's only one row in the
     * table whose id is {@link MIGRATION_LOCK_ID}. `is_locked` is an integer.
     * Kysely takes care of creating the lock table and inserting the one single
     * row to it before this method is executed.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(db: Kysely<any>): Promise<void>;
}

/**
 * This interface abstracts away the details of how to compile a query into SQL
 * and execute it. Instead of passing around all those details, {@link SelectQueryBuilder}
 * and other classes that execute queries can just pass around and instance of
 * `QueryExecutor`.
 */
interface QueryExecutor extends ConnectionProvider {
    /**
     * Returns the adapter for the current dialect.
     */
    get adapter(): DialectAdapter;
    /**
     * Returns all installed plugins.
     */
    get plugins(): ReadonlyArray<KyselyPlugin>;
    /**
     * Given the query the user has built (expressed as an operation node tree)
     * this method runs it through all plugins' `transformQuery` methods and
     * returns the result.
     */
    transformQuery<T extends RootOperationNode>(node: T, queryId: QueryId): T;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    compileQuery(node: RootOperationNode, queryId: QueryId): CompiledQuery;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method.
     */
    executeQuery<R>(compiledQuery: CompiledQuery, queryId: QueryId): Promise<QueryResult<R>>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method. Results are streamead instead of loaded
     * at once.
     */
    stream<R>(compiledQuery: CompiledQuery, 
    /**
     * How many rows should be pulled from the database at once. Supported
     * only by the postgres driver.
     */
    chunkSize: number, queryId: QueryId): AsyncIterableIterator<QueryResult<R>>;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    withConnectionProvider(connectionProvider: ConnectionProvider): QueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    withPlugin(plugin: KyselyPlugin): QueryExecutor;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    withPlugins(plugin: ReadonlyArray<KyselyPlugin>): QueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    withPluginAtFront(plugin: KyselyPlugin): QueryExecutor;
    /**
     * Returns a copy of this executor without any plugins.
     */
    withoutPlugins(): QueryExecutor;
}

/**
 * @internal
 * @private
 */
interface QueryExecutorProvider {
    getExecutor(): QueryExecutor;
}

/**
 * An instance of this class can be used to create raw SQL snippets or queries.
 *
 * You shouldn't need to create `RawBuilder` instances directly. Instead you should
 * use the {@link sql} template tag.
 */
declare class RawBuilder<O> implements Expression<O> {
    #private;
    constructor(props: RawBuilderProps);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): O | undefined;
    /**
     * Returns an aliased version of the SQL expression.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `full_name: string` field exists in the result type.
     * console.log(result.full_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```ts
     * select concat(first_name, ' ', last_name) as "full_name"
     * from "person"
     * ```
     *
     * You can also pass in a raw SQL snippet but in that case you must
     * provide the alias as the only type argument:
     *
     * ```ts
     * const values = sql<{ a: number, b: string }>`(values (1, 'foo'))`
     *
     * // The alias is `t(a, b)` which specifies the column names
     * // in addition to the table name. We must tell kysely that
     * // columns of the table can be referenced through `t`
     * // by providing an explicit type argument.
     * const aliasedValues = values.as<'t'>(sql`t(a, b)`)
     *
     * await db
     *   .insertInto('person')
     *   .columns(['first_name', 'last_name'])
     *   .expression(
     *     db.selectFrom(aliasedValues).select(['t.a', 't.b'])
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```ts
     * insert into "person" ("first_name", "last_name")
     * from (values (1, 'foo')) as t(a, b)
     * select "t"."a", "t"."b"
     * ```
     */
    as<A extends string>(alias: A): AliasedRawBuilder<O, A>;
    as<A extends string = never>(alias: Expression<any>): AliasedRawBuilder<O, A>;
    /**
     * Change the output type of the raw expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `RawBuilder` with a new output type.
     */
    castTo<T>(): RawBuilder<T>;
    /**
     * Adds a plugin for this SQL snippet.
     */
    withPlugin(plugin: KyselyPlugin): RawBuilder<O>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): RawNode;
    execute(executorProvider: QueryExecutorProvider): Promise<QueryResult<O>>;
}
declare function isRawBuilder(obj: unknown): obj is RawBuilder<unknown>;
/**
 * {@link RawBuilder} with an alias. The result of calling {@link RawBuilder.as}.
 */
declare class AliasedRawBuilder<O = unknown, A extends string = never> implements AliasedExpression<O, A> {
    #private;
    constructor(rawBuilder: RawBuilder<O>, alias: A | Expression<any>);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<O>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
interface RawBuilderProps {
    readonly queryId: QueryId;
    readonly rawNode: RawNode;
    readonly plugins?: ReadonlyArray<KyselyPlugin>;
}

interface PartitionByItemNode extends OperationNode {
    readonly kind: 'PartitionByItemNode';
    readonly partitionBy: SimpleReferenceExpressionNode;
}
/**
 * @internal
 */
declare const PartitionByItemNode: Readonly<{
    is(node: OperationNode): node is PartitionByItemNode;
    create(partitionBy: SimpleReferenceExpressionNode): PartitionByItemNode;
}>;

interface PartitionByNode extends OperationNode {
    readonly kind: 'PartitionByNode';
    readonly items: ReadonlyArray<PartitionByItemNode>;
}
/**
 * @internal
 */
declare const PartitionByNode: Readonly<{
    is(node: OperationNode): node is PartitionByNode;
    create(items: ReadonlyArray<PartitionByItemNode>): PartitionByNode;
    cloneWithItems(partitionBy: PartitionByNode, items: ReadonlyArray<PartitionByItemNode>): PartitionByNode;
}>;

interface OverNode extends OperationNode {
    readonly kind: 'OverNode';
    readonly orderBy?: OrderByNode;
    readonly partitionBy?: PartitionByNode;
}
/**
 * @internal
 */
declare const OverNode: Readonly<{
    is(node: OperationNode): node is OverNode;
    create(): OverNode;
    cloneWithOrderByItem(overNode: OverNode, item: OrderByItemNode): OverNode;
    cloneWithPartitionByItems(overNode: OverNode, items: ReadonlyArray<PartitionByItemNode>): OverNode;
}>;

declare type AggregateFunction = 'avg' | 'count' | 'max' | 'min' | 'sum';
interface AggregateFunctionNode extends OperationNode {
    readonly kind: 'AggregateFunctionNode';
    readonly func: AggregateFunction;
    readonly column: SimpleReferenceExpressionNode;
    readonly distinct?: boolean;
    readonly filter?: WhereNode;
    readonly over?: OverNode;
}
/**
 * @internal
 */
declare const AggregateFunctionNode: Readonly<{
    is(node: OperationNode): node is AggregateFunctionNode;
    create(aggregateFunction: AggregateFunction, column: SimpleReferenceExpressionNode): AggregateFunctionNode;
    cloneWithDistinct(aggregateFunctionNode: AggregateFunctionNode): AggregateFunctionNode;
    cloneWithFilter(aggregateFunctionNode: AggregateFunctionNode, filter: OperationNode): AggregateFunctionNode;
    cloneWithOrFilter(aggregateFunctionNode: AggregateFunctionNode, filter: OperationNode): AggregateFunctionNode;
    cloneWithOver(aggregateFunctionNode: AggregateFunctionNode, over?: OverNode): AggregateFunctionNode;
}>;

declare type OrderByDirection = 'asc' | 'desc';
declare type OrderByExpression<DB, TB extends keyof DB, O> = ReferenceExpression<DB, TB> | (keyof O & string);
declare type OrderByDirectionExpression = OrderByDirection | Expression<any>;

declare type PartitionByExpression<DB, TB extends keyof DB> = StringReference<DB, TB> | DynamicReferenceBuilder<any>;

declare class OverBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: OverBuilderProps);
    /**
     * Adds an order by clause item inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over(
     *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
     * from "person"
     * ```
     */
    orderBy(orderBy: StringReference<DB, TB> | DynamicReferenceBuilder<any>, direction?: OrderByDirectionExpression): OverBuilder<DB, TB>;
    /**
     * Adds partition by clause item/s inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy(['last_name', 'first_name'])
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name", "first_name") as "average_age"
     * from "person"
     * ```
     */
    partitionBy(partitionBy: ReadonlyArray<PartitionByExpression<DB, TB>>): OverBuilder<DB, TB>;
    partitionBy(partitionBy: PartitionByExpression<DB, TB>): OverBuilder<DB, TB>;
    toOperationNode(): OverNode;
}
interface OverBuilderProps {
    readonly overNode: OverNode;
}

interface BinaryOperationNode extends OperationNode {
    readonly kind: 'BinaryOperationNode';
    readonly leftOperand: OperationNode;
    readonly operator: OperationNode;
    readonly rightOperand: OperationNode;
}
/**
 * @internal
 */
declare const BinaryOperationNode: Readonly<{
    is(node: OperationNode): node is BinaryOperationNode;
    create(leftOperand: OperationNode, operator: OperationNode, rightOperand: OperationNode): BinaryOperationNode;
}>;

declare const COMPARISON_OPERATORS: readonly ["=", "==", "!=", "<>", ">", ">=", "<", "<=", "in", "not in", "is", "is not", "like", "not like", "ilike", "not ilike", "@>", "<@", "?", "?&", "!<", "!>", "<=>", "!~", "~", "~*", "!~*", "&&", "||", "@@", "@@@", "!!", "<->"];
declare const UNARY_FILTER_OPERATORS: readonly ["exists", "not exists"];
declare type ComparisonOperator = typeof COMPARISON_OPERATORS[number];
declare type UnaryFilterOperator = typeof UNARY_FILTER_OPERATORS[number];
declare type Operator = ComparisonOperator | UnaryFilterOperator;
interface OperatorNode extends OperationNode {
    readonly kind: 'OperatorNode';
    readonly operator: Operator;
}
/**
 * @internal
 */
declare const OperatorNode: Readonly<{
    is(node: OperationNode): node is OperatorNode;
    create(operator: Operator): OperatorNode;
}>;

declare type ValueExpression<DB, TB extends keyof DB, V> = V | ExpressionOrFactory<DB, TB, V>;
declare type ValueExpressionOrList<DB, TB extends keyof DB, V> = ValueExpression<DB, TB, V> | ReadonlyArray<ValueExpression<DB, TB, V>>;

interface UnaryOperationNode extends OperationNode {
    readonly kind: 'UnaryOperationNode';
    readonly operator: OperationNode;
    readonly operand: OperationNode;
}
/**
 * @internal
 */
declare const UnaryOperationNode: Readonly<{
    is(node: OperationNode): node is UnaryOperationNode;
    create(operator: OperationNode, operand: OperationNode): UnaryOperationNode;
}>;

declare type ExistsExpression<DB, TB extends keyof DB> = ExpressionOrFactory<DB, TB, any>;

interface WhereInterface<DB, TB extends keyof DB> {
    /**
     * Adds a `where` clause to the query.
     *
     * Also see {@link orWhere}, {@link whereExists} and {@link whereRef}.
     *
     * ### Examples
     *
     * Find a row by column value:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 100)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = $1
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use
     *
     * ```ts
     * sql`your operator`
     * ```
     *
     * The next example uses the `>` operator:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '>', 100)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" > $1
     * ```
     *
     * `where` methods don't change the type of the query. You can add
     * conditional statements easily by doing something like this:
     *
     * ```ts
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * This is true for basically all methods execpt the `select` and
     * `returning`, that __do__ change the return type of the query.
     *
     * Both the first and third argument can also be subqueries.
     * A subquery is defined by passing a function and calling
     * the `selectFrom` method of the object passed into the
     * function:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be subqueries or raw
     * {@link sql} expressions.
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * If you only pass one function argument to this method, it can be
     * used to create parentheses around other where statements:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .orWhere(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): WhereInterface<DB, TB>;
    where(grouper: WhereGrouper<DB, TB>): WhereInterface<DB, TB>;
    where(expression: Expression<any>): WhereInterface<DB, TB>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((qb) => qb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): WhereInterface<DB, TB>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link where}.
     *
     * It's often necessary to wrap `or where` clauses in parentheses to control
     * precendence. You can use the one argument version of the `where` method
     * for that. See the examples.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 1)
     *   .orWhere('id', '=', 2)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = 1 or "id" = 2
     * ```
     *
     * Grouping with parentheses:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * Even the first `where` can be an `orWhere`. This is useful
     * if you are looping through a set of conditions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .orWhere('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     */
    orWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): WhereInterface<DB, TB>;
    orWhere(grouper: WhereGrouper<DB, TB>): WhereInterface<DB, TB>;
    orWhere(expression: Expression<any>): WhereInterface<DB, TB>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link whereRef}.
     *
     * Also see {@link orWhere} and {@link where}.
     */
    orWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): WhereInterface<DB, TB>;
    /**
     * Adds a `where exists` clause to the query.
     *
     * You can either use a subquery or a raw {@link sql} snippet.
     *
     * ### Examples
     *
     * The query below selets all persons that own a pet named Catto:
     *
     * ```ts
     * const petName = 'Catto'
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .whereExists((qb) => qb
     *     .selectFrom('pet')
     *     .select('pet.id')
     *     .whereRef('person.id', '=', 'pet.owner_id')
     *     .where('pet.name', '=', petName)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select "pet"."id"
     *   from "pet"
     *   where "person"."id" = "pet"."owner_id"
     *   and "pet"."name" = $1
     * )
     * ```
     *
     * The same query as in the previous example but with using raw {@link sql}:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const petName = 'Catto'
     * db.selectFrom('person')
     *   .selectAll()
     *   .whereExists(
     *     sql`(select pet.id from pet where person.id = pet.owner_id and pet.name = ${petName})`
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select pet.id
     *   from pet
     *   where person.id = pet.owner_id
     *   and pet.name = $1
     * )
     * ```
     */
    whereExists(arg: ExistsExpression<DB, TB>): WhereInterface<DB, TB>;
    /**
     * Just like {@link whereExists} but creates a `not exists` clause.
     */
    whereNotExists(arg: ExistsExpression<DB, TB>): WhereInterface<DB, TB>;
    /**
     * Just like {@link whereExists} but creates an `or exists` clause.
     */
    orWhereExists(arg: ExistsExpression<DB, TB>): WhereInterface<DB, TB>;
    /**
     * Just like {@link whereExists} but creates an `or not exists` clause.
     */
    orWhereNotExists(arg: ExistsExpression<DB, TB>): WhereInterface<DB, TB>;
}

interface HavingInterface<DB, TB extends keyof DB> {
    /**
     * Just like {@link WhereInterface.where | where} but adds a `having` statement
     * instead of a `where` statement.
     */
    having<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): HavingInterface<DB, TB>;
    having(grouper: HavingGrouper<DB, TB>): HavingInterface<DB, TB>;
    having(expression: Expression<any>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereRef | whereRef} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhere | orWhere} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHaving<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): HavingInterface<DB, TB>;
    orHaving(grouper: HavingGrouper<DB, TB>): HavingInterface<DB, TB>;
    orHaving(expression: Expression<any>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereRef | orWhereRef} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHavingRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereExists | whereExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingExists(arg: ExistsExpression<DB, TB>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereNotExists | whereNotExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingNotExist(arg: ExistsExpression<DB, TB>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereExists | orWhereExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHavingExists(arg: ExistsExpression<DB, TB>): HavingInterface<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereNotExists | orWhereNotExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHavingNotExists(arg: ExistsExpression<DB, TB>): HavingInterface<DB, TB>;
}

declare type OperandValueExpression<DB, TB extends keyof DB, RE> = ValueExpression<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
declare type OperandValueExpressionOrList<DB, TB extends keyof DB, RE> = ValueExpressionOrList<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>;
declare type WhereGrouper<DB, TB extends keyof DB> = (qb: WhereInterface<DB, TB>) => WhereInterface<DB, TB>;
declare type HavingGrouper<DB, TB extends keyof DB> = (qb: HavingInterface<DB, TB>) => HavingInterface<DB, TB>;
declare type ComparisonOperatorExpression = ComparisonOperator | Expression<any>;

declare class AggregateFunctionBuilder<DB, TB extends keyof DB, O = unknown> implements Expression<O> {
    #private;
    constructor(props: AggregateFunctionBuilderProps);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): O | undefined;
    /**
     * Returns an aliased version of the function.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.count<number>('id').as('person_count')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `person_count: number` field exists in the result type.
     * console.log(result.person_count)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "person_count"
     * from "person"
     * ```
     */
    as<A extends string>(alias: A): AliasedAggregateFunctionBuilder<DB, TB, O, A>;
    /**
     * Adds a `distinct` clause inside the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(distinct "first_name") as "first_name_count"
     * from "person"
     * ```
     */
    distinct(): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `filter` clause with a nested `where` clause after the function.
     *
     * Similar to {@link WhereInterface}'s `where` method.
     *
     * Also see {@link orFilterWhere}, {@link filterWhereExists} and {@link filterWhereRef}.
     *
     * ### Examples
     *
     * Count by gender:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select([
     *     (eb) =>
     *       eb.fn
     *         .count<number>('id')
     *         .filterWhere('gender', '=', 'female')
     *         .as('female_count'),
     *     (eb) =>
     *       eb.fn
     *         .count<number>('id')
     *         .filterWhere('gender', '=', 'male')
     *         .as('male_count'),
     *     (eb) =>
     *       eb.fn
     *         .count<number>('id')
     *         .filterWhere('gender', '=', 'other')
     *         .as('other_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "gender" = $1) as "female_count",
     *   count("id") filter(where "gender" = $2) as "male_count",
     *   count("id") filter(where "gender" = $3) as "other_count"
     * from "person"
     * ```
     */
    filterWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): AggregateFunctionBuilder<DB, TB, O>;
    filterWhere(grouper: WhereGrouper<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    filterWhere(expression: Expression<any>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `filter` clause with a nested `where exists` clause after the function.
     *
     * Similar to {@link WhereInterface}'s `whereExists` method.
     *
     * ### Examples
     *
     * Count pet owners versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select([
     *     (eb) =>
     *       eb.fn
     *         .count<number>('person.id')
     *         .filterWhereExists((qb) =>
     *           qb
     *             .selectFrom('pet')
     *             .select('pet.id')
     *             .whereRef('pet.owner_id', '=', 'person.id')
     *         )
     *         .as('pet_owner_count'),
     *     (eb) => eb.fn.count<number>('person.id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("person"."id") filter(where exists (
     *   select "pet"."id"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     * )) as "pet_ower_count",
     *   count("person"."id") as "total_count"
     * from "person"
     * ```
     */
    filterWhereExists(arg: ExistsExpression<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Just like {@link filterWhereExists} but creates a `not exists` clause inside
     * the `filter` clause.
     */
    filterWhereNotExists(arg: ExistsExpression<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `filter` clause with a nested `where` clause after the function, where
     * both sides of the operator are references to columns.
     *
     * Similar to {@link WhereInterface}'s `whereRef` method.
     *
     * ### Examples
     *
     * Count people with same first and last names versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select([
     *     (eb) =>
     *       eb.fn
     *         .count<number>('id')
     *         .filterWhereRef('first_name', '=', 'last_name')
     *         .as('repeat_name_count'),
     *     (eb) => eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */
    filterWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds a `filter` clause with a nested `or where` clause after the function.
     * Otherwise works just like {@link filterWhere}.
     *
     * Similar to {@link WhereInterface}'s `orWhere` method.
     *
     * ### Examples
     *
     * For some reason you're tasked with counting adults (18+) or people called
     * "Bob" versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select([
     *     (eb) =>
     *       eb.fn
     *         .count<number>('id')
     *         .filterWhere('age', '>=', '18')
     *         .orFilterWhere('first_name', '=', 'Bob')
     *         .as('adult_or_bob_count'),
     *     (eb) => eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "age" >= $1 or "first_name" = $2) as "adult_or_bob_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */
    orFilterWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): AggregateFunctionBuilder<DB, TB, O>;
    orFilterWhere(grouper: WhereGrouper<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    orFilterWhere(expression: Expression<any>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Just like {@link filterWhereExists} but creates an `or exists` clause inside
     * the `filter` clause.
     *
     * Similar to {@link WhereInterface}'s `orWhereExists` method.
     */
    orFilterWhereExists(arg: ExistsExpression<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Just like {@link filterWhereExists} but creates an `or not exists` clause inside
     * the `filter` clause.
     *
     * Similar to {@link WhereInterface}'s `orWhereNotExists` method.
     */
    orFilterWhereNotExists(arg: ExistsExpression<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds an `or where` clause inside the `filter` clause. Otherwise works just
     * like {@link filterWhereRef}.
     *
     * Also see {@link orFilterWhere} and {@link filterWhere}.
     *
     * Similar to {@link WhereInterface}'s `orWhereRef` method.
     */
    orFilterWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Adds an `over` clause (window functions) after the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over().as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over() as "average_age"
     * from "person"
     * ```
     *
     * Also supports passing a callback that returns an over builder,
     * allowing to add partition by and sort by clauses inside over.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
     * from "person"
     * ```
     */
    over(over?: OverBuilderCallback<DB, TB>): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): AggregateFunctionNode;
}
/**
 * {@link AggregateFunctionBuilder} with an alias. The result of calling {@link AggregateFunctionBuilder.as}.
 */
declare class AliasedAggregateFunctionBuilder<DB, TB extends keyof DB, O = unknown, A extends string = never> implements AliasedExpression<O, A> {
    #private;
    constructor(aggregateFunctionBuilder: AggregateFunctionBuilder<DB, TB, O>, alias: A);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<O>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
interface AggregateFunctionBuilderProps {
    aggregateFunctionNode: AggregateFunctionNode;
}
declare type OverBuilderCallback<DB, TB extends keyof DB> = (builder: OverBuilder<DB, TB>) => OverBuilder<DB, TB>;

/**
 * Helpers for type safe SQL function calls.
 *
 * You can always use the {@link sql} tag to call functions and build arbitrary
 * expressions. This module simply has shortcuts for most common function calls.
 *
 * ### Examples
 *
 * ```ts
 * const { count } = db.fn
 *
 * await db.selectFrom('person')
 *   .innerJoin('pet', 'pet.owner_id', 'person.id')
 *   .select([
 *     'person.id',
 *     count('pet.id').as('pet_count')
 *   ])
 *   .groupBy('person.id')
 *   .having(count('pet.id'), '>', 10)
 *   .execute()
 * ```
 *
 * The generated SQL (PostgreSQL):
 *
 * ```sql
 * select "person"."id", count("pet"."id") as "pet_count"
 * from "person"
 * inner join "pet" on "pet"."owner_id" = "person"."id"
 * group by "person"."id"
 * having count("pet"."id") > $1
 * ```
 */
declare class FunctionModule<DB, TB extends keyof DB> {
    constructor();
    /**
     * Calls the `avg` function for the column given as the argument.
     *
     * If this is used in a `select` statement the type of the selected expression
     * will be `number | string` by default. This is because Kysely can't know the
     * type the db driver outputs. Sometimes the output can be larger than the largest
     * javascript number and a string is returned instead. Most drivers allow you
     * to configure the output type of large numbers and Kysely can't know if you've
     * done so.
     *
     * You can specify the output type of the expression by providing the type as
     * the first type argument:
     *
     * ```ts
     * const { avg } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(avg<number>('price').as('avg_price'))
     *   .execute()
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a `coalesce`
     * function.
     *
     * ```ts
     * const { avg } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(avg<number | null>('price').as('avg_price'))
     *   .execute()
     * ```
     */
    avg<O extends number | string | null = number | string, C extends SimpleReferenceExpression<DB, TB> = SimpleReferenceExpression<DB, TB>>(column: C): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `coalesce` function for given arguments.
     *
     * This function returns the first non-null value from left to right, commonly
     * used to provide a default scalar for nullable columns or functions.
     *
     * ```ts
     * const { coalesce, max } = db.fn
     *
     * db.selectFrom('person')
     *   .select(coalesce(max('age'), sql<number>`0`).as('max_age'))
     *   .where('first_name', '=', 'Jennifer')
     *   .execute()
     * ```
     *
     * The generated SQL (postgres):
     *
     * ```sql
     * select coalesce(max("age"), 0) as "max_age" from "person" where "first_name" = $1
     * ```
     *
     * If this is used in a `select` statement the type of the selected expression
     * is inferred in the same manner that the function computes. A union of arguments'
     * types - if a non-nullable argument exists, it stops there (ignoring any further
     * arguments' types) and exludes null from the final union type.
     *
     * Examples:
     *
     * `(string | null, number | null)` is inferred as `string | number | null`.
     *
     * `(string | null, number, Date | null)` is inferred as `string | number`.
     *
     * `(number, string | null)` is inferred as `number`.
     */
    coalesce<V extends ReferenceExpression<DB, TB>, OV extends ReferenceExpression<DB, TB>[]>(value: V, ...otherValues: OV): RawBuilder<CoalesceReferenceExpressionList<DB, TB, [V, ...OV]>>;
    /**
     * Calls the `count` function for the column given as the argument.
     *
     * If this is used in a `select` statement the type of the selected expression
     * will be `number | string | bigint` by default. This is because Kysely
     * can't know the type the db driver outputs. Sometimes the output can be larger
     * than the largest javascript number and a string is returned instead. Most
     * drivers allow you to configure the output type of large numbers and Kysely
     * can't know if you've done so.
     *
     * You can specify the output type of the expression by providing
     * the type as the first type argument:
     *
     * ```ts
     * const { count } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(count<number>('id').as('num_toys'))
     *   .execute()
     * ```
     *
     * You can limit column range:
     *
     * ```ts
     * db.selectFrom('toy')
     *   .select(qb => qb.fn.count<number>('id').as('num_toys'))
     *   .execute()
     * ```
     */
    count<O extends number | string | bigint, C extends SimpleReferenceExpression<DB, TB> = SimpleReferenceExpression<DB, TB>>(column: C): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `max` function for the column given as the argument.
     *
     * If this is used in a `select` statement the type of the selected expression
     * will be the referenced column's type.
     *
     * ### Examples
     *
     * ```ts
     * const { max } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(max('price').as('max_price'))
     *   .execute()
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a `coalesce`
     * function.
     *
     * ```ts
     * const { max } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(max<number | null, 'price'>('price').as('max_price'))
     *   .execute()
     * ```
     */
    max<O extends number | string | bigint | null = never, C extends StringReference<DB, TB> = StringReference<DB, TB>>(column: OutputBoundStringReference<DB, TB, C, O>): StringReferenceBoundAggregateFunctionBuilder<DB, TB, C, O>;
    max<O extends number | string | bigint | null = number | string | bigint>(column: DynamicReferenceBuilder): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `min` function for the column given as the argument.
     *
     * If this is used in a `select` statement the type of the selected expression
     * will be the referenced column's type.
     *
     * ### Examples
     *
     * ```ts
     * const { min } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(min('price').as('min_price'))
     *   .execute()
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a `coalesce`
     * function.
     *
     * ```ts
     * const { min } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(min<number | null, 'price'>('price').as('min_price'))
     *   .execute()
     * ```
     */
    min<O extends number | string | bigint | null = never, C extends StringReference<DB, TB> = StringReference<DB, TB>>(column: OutputBoundStringReference<DB, TB, C, O>): StringReferenceBoundAggregateFunctionBuilder<DB, TB, C, O>;
    min<O extends number | string | bigint | null = number | string | bigint>(column: DynamicReferenceBuilder): AggregateFunctionBuilder<DB, TB, O>;
    /**
     * Calls the `sum` function for the column given as the argument.
     *
     * If this is used in a `select` statement the type of the selected expression
     * will be `number | string | bigint` by default. This is because Kysely
     * can't know the type the db driver outputs. Sometimes the output can be larger
     * than the largest javascript number and a string is returned instead. Most
     * drivers allow you to configure the output type of large numbers and Kysely
     * can't know if you've done so.
     *
     * You can specify the output type of the expression by providing
     * the type as the first type argument:
     *
     * ```ts
     * const { sum } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(sum<number>('price').as('total_price'))
     *   .execute()
     * ```
     *
     * Sometimes a null is returned, e.g. when row count is 0, and no `group by`
     * was used. It is highly recommended to include null in the output type union
     * and handle null values in post-execute code, or wrap the function with a `coalesce`
     * function.
     *
     * ```ts
     * const { sum } = db.fn
     *
     * db.selectFrom('toy')
     *   .select(sum<number | null>('price').as('total_price'))
     *   .execute()
     * ```
     */
    sum<O extends number | string | bigint | null = number | string | bigint, C extends SimpleReferenceExpression<DB, TB> = SimpleReferenceExpression<DB, TB>>(column: C): AggregateFunctionBuilder<DB, TB, O>;
}
declare type OutputBoundStringReference<DB, TB extends keyof DB, C extends StringReference<DB, TB>, O> = IsNever<O> extends true ? C : Equals<ExtractTypeFromReferenceExpression<DB, TB, C> | null, O | null> extends true ? C : never;
declare type StringReferenceBoundAggregateFunctionBuilder<DB, TB extends keyof DB, C extends StringReference<DB, TB>, O> = AggregateFunctionBuilder<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, C> | (null extends O ? null : never)>;

declare class ExpressionBuilder<DB, TB extends keyof DB> {
    #private;
    constructor(props: ExpressionBuilderProps);
    /**
     * Returns a {@link FunctionModule} that can be used to write type safe function
     * calls.
     *
     * The difference between this and {@link Kysely.fn} is that this one is more
     * type safe. You can only refer to columns visible to the part of the query
     * you are building. {@link Kysely.fn} allows you to refer to columns in any
     * table of the database even if it doesn't produce valid SQL.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'person.id',
     *     (qb) => qb.fn.count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "pet_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     */
    get fn(): FunctionModule<DB, TB>;
    /**
     * Creates a subquery.
     *
     * The query builder returned by this method is typed in a way that you can refer to
     * all tables of the parent query in addition to the subquery's tables.
     *
     * This method accepts all the same inputs as {@link QueryCreator.selectFrom}.
     *
     * ### Examples
     *
     * This example shows that you can refer to both `pet.owner_id` and `person.id`
     * columns from the subquery. This is needed to be able to create correlated
     * subqueries:
     *
     * ```ts
     * const result = await db.selectFrom('pet')
     *   .select([
     *     'pet.name',
     *     (qb) => qb.selectFrom('person')
     *       .whereRef('person.id', '=', 'pet.owner_id')
     *       .select('person.first_name')
     *       .as('owner_name')
     *   ])
     *   .execute()
     *
     * console.log(result[0].owner_name)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "pet"."name",
     *   ( select "person"."first_name"
     *     from "person"
     *     where "person"."id" = "pet"."owner_id"
     *   ) as "owner_name"
     * from "pet"
     * ```
     *
     * You can use a normal query in place of `(qb) => qb.selectFrom(...)` but in
     * that case Kysely typings wouldn't allow you to reference `pet.owner_id`
     * because `pet` is not joined to that query.
     */
    selectFrom<TE extends TableExpression<DB, TB>>(from: TE[]): SelectQueryBuilder<From<DB, TE>, FromTables<DB, TB, TE>, {}>;
    selectFrom<TE extends TableExpression<DB, TB>>(from: TE): SelectQueryBuilder<From<DB, TE>, FromTables<DB, TB, TE>, {}>;
    /**
     * See {@link QueryCreator.withSchema}
     */
    withSchema(schema: string): ExpressionBuilder<DB, TB>;
    /**
     * This can be used to reference columns.
     *
     * ### Examples
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * db.insertInto('person')
     *   .values(person)
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     * ```
     *
     * In the next example we use `ref` in a raw sql expression. Unless you
     * want to be as type-safe as possible, this is probably overkill:
     *
     * ```ts
     * db.update('pet').set({
     *   name: (eb) => sql`concat(${eb.ref('pet.name')}, ${suffix})`
     * })
     * ```
     */
    ref<RE extends StringReference<DB, TB>>(reference: RE): RawBuilder<ExtractTypeFromReferenceExpression<DB, TB, RE>>;
}
interface ExpressionBuilderProps {
    readonly executor: QueryExecutor;
}

declare type ExpressionOrFactory<DB, TB extends keyof DB, V> = SelectQueryBuilder<any, any, Record<string, V>> | ((eb: ExpressionBuilder<DB, TB>) => SelectQueryBuilder<any, any, Record<string, V>>) | Expression<V> | ((eb: ExpressionBuilder<DB, TB>) => Expression<V>);
declare type AliasedExpressionOrFactory<DB, TB extends keyof DB> = AliasedExpression<any, any> | ((qb: ExpressionBuilder<DB, TB>) => AliasedExpression<any, any>);

declare type TableExpression<DB, TB extends keyof DB> = TableReference<DB> | AliasedExpressionOrFactory<DB, TB>;
declare type TableExpressionOrList<DB, TB extends keyof DB> = TableExpression<DB, TB> | ReadonlyArray<TableExpression<DB, TB>>;
declare type TableReference<DB> = AnyAliasedTable<DB> | AnyTable<DB> | AliasedExpression<any, any>;
declare type From<DB, TE> = {
    [C in keyof DB | ExtractAliasFromTableExpression<DB, TE>]: C extends ExtractAliasFromTableExpression<DB, TE> ? ExtractRowTypeFromTableExpression<DB, TE, C> : C extends keyof DB ? DB[C] : never;
};
declare type FromTables<DB, TB extends keyof DB, TE> = TB | ExtractAliasFromTableExpression<DB, TE>;
declare type ExtractAliasFromTableExpression<DB, TE> = TE extends `${string} as ${infer TA}` ? TA : TE extends keyof DB ? TE : TE extends AliasedExpression<any, infer QA> ? QA : TE extends (qb: any) => AliasedExpression<any, infer QA> ? QA : never;
declare type ExtractRowTypeFromTableExpression<DB, TE, A extends keyof any> = TE extends `${infer T} as ${infer TA}` ? TA extends A ? T extends keyof DB ? DB[T] : never : never : TE extends A ? TE extends keyof DB ? DB[TE] : never : TE extends AliasedExpression<infer O, infer QA> ? QA extends A ? O : never : TE extends (qb: any) => AliasedExpression<infer O, infer QA> ? QA extends A ? O : never : never;
declare type AnyAliasedTable<DB> = `${AnyTable<DB>} as ${string}`;
declare type AnyTable<DB> = keyof DB & string;

declare class JoinBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: JoinBuilderProps);
    /**
     * Just like {@link WhereInterface.where} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.where} for documentation and examples.
     */
    on<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): JoinBuilder<DB, TB>;
    on(grouper: (qb: JoinBuilder<DB, TB>) => JoinBuilder<DB, TB>): JoinBuilder<DB, TB>;
    on(expression: Expression<any>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhere} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhere} for documentation and examples.
     */
    orOn<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): JoinBuilder<DB, TB>;
    orOn(grouper: (qb: JoinBuilder<DB, TB>) => JoinBuilder<DB, TB>): JoinBuilder<DB, TB>;
    orOn(expression: Expression<any>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */
    onRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhereRef} for documentation and examples.
     */
    orOnRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereExists} for documentation and examples.
     */
    onExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.whereNotExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereNotExists} for documentation and examples.
     */
    onNotExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhereExists} for documentation and examples.
     */
    orOnExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Just like {@link WhereInterface.orWhereNotExists} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.orWhereNotExists} for documentation and examples.
     */
    orOnNotExists(arg: ExistsExpression<DB, TB>): JoinBuilder<DB, TB>;
    /**
     * Adds `on true`.
     */
    onTrue(): JoinBuilder<DB, TB>;
    toOperationNode(): JoinNode;
}
interface JoinBuilderProps {
    readonly joinNode: JoinNode;
}

declare type JoinReferenceExpression<DB, TB extends keyof DB, TE> = AnyJoinColumn<DB, TB, TE> | AnyJoinColumnWithTable<DB, TB, TE>;
declare type JoinCallbackExpression<DB, TB extends keyof DB, TE> = (join: JoinBuilder<From<DB, TE>, FromTables<DB, TB, TE>>) => JoinBuilder<any, any>;
declare type AnyJoinColumn<DB, TB extends keyof DB, TE> = AnyColumn<From<DB, TE>, FromTables<DB, TB, TE>>;
declare type AnyJoinColumnWithTable<DB, TB extends keyof DB, TE> = AnyColumnWithTable<From<DB, TE>, FromTables<DB, TB, TE>>;

declare type SelectExpression<DB, TB extends keyof DB> = AnyAliasedColumnWithTable<DB, TB> | AnyAliasedColumn<DB, TB> | AnyColumnWithTable<DB, TB> | AnyColumn<DB, TB> | DynamicReferenceBuilder<any> | AliasedExpressionOrFactory<DB, TB>;
declare type SelectExpressionOrList<DB, TB extends keyof DB> = SelectExpression<DB, TB> | ReadonlyArray<SelectExpression<DB, TB>>;
/**
 * Given a selection expression returns a query builder type that
 * has the selection.
 */
declare type QueryBuilderWithSelection<DB, TB extends keyof DB, O, SE> = SelectQueryBuilder<DB, TB, O & Selection<DB, TB, SE>>;
/**
 * `selectAll` output query builder type.
 */
declare type SelectAllQueryBuilder<DB, TB extends keyof DB, O, S extends keyof DB> = SelectQueryBuilder<DB, TB, O & AllSelection<DB, S>>;
declare type Selection<DB, TB extends keyof DB, SE> = {
    [A in ExtractAliasFromSelectExpression<SE>]: SelectType<ExtractTypeFromSelectExpression<DB, TB, SE, A>>;
};
declare type ExtractAliasFromSelectExpression<SE> = SE extends string ? ExtractAliasFromStringSelectExpression<SE> : SE extends AliasedExpression<any, infer EA> ? EA : SE extends (qb: any) => AliasedExpression<any, infer EA> ? EA : SE extends DynamicReferenceBuilder<infer RA> ? ExtractAliasFromStringSelectExpression<RA> : never;
declare type ExtractAliasFromStringSelectExpression<SE extends string> = SE extends `${string}.${string}.${string} as ${infer A}` ? A : SE extends `${string}.${string} as ${infer A}` ? A : SE extends `${string} as ${infer A}` ? A : SE extends `${string}.${string}.${infer C}` ? C : SE extends `${string}.${infer C}` ? C : SE;
declare type ExtractTypeFromSelectExpression<DB, TB extends keyof DB, SE, A extends keyof any> = SE extends string ? ExtractTypeFromStringSelectExpression<DB, TB, SE, A> : SE extends AliasedSelectQueryBuilder<any, any, infer O, infer QA> ? QA extends A ? ValueType<O> : never : SE extends (qb: any) => AliasedSelectQueryBuilder<any, any, infer O, infer QA> ? QA extends A ? ValueType<O> : never : SE extends AliasedExpression<infer O, infer EA> ? EA extends A ? O : never : SE extends (qb: any) => AliasedExpression<infer O, infer EA> ? EA extends A ? O : never : SE extends DynamicReferenceBuilder<infer RA> ? A extends ExtractAliasFromStringSelectExpression<RA> ? ExtractTypeFromStringSelectExpression<DB, TB, RA, A> | undefined : never : never;
declare type ExtractTypeFromStringSelectExpression<DB, TB extends keyof DB, SE extends string, A extends keyof any> = SE extends `${infer SC}.${infer T}.${infer C} as ${infer RA}` ? RA extends A ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : never : SE extends `${infer T}.${infer C} as ${infer RA}` ? RA extends A ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : never : SE extends `${infer C} as ${infer RA}` ? RA extends A ? C extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, C> : never : never : SE extends `${infer SC}.${infer T}.${infer C}` ? C extends A ? `${SC}.${T}` extends TB ? C extends keyof DB[`${SC}.${T}`] ? DB[`${SC}.${T}`][C] : never : never : never : SE extends `${infer T}.${infer C}` ? C extends A ? T extends TB ? C extends keyof DB[T] ? DB[T][C] : never : never : never : SE extends A ? SE extends AnyColumn<DB, TB> ? ExtractColumnType<DB, TB, SE> : never : never;
declare type AllSelection<DB, TB extends keyof DB> = Selectable<{
    [C in AnyColumn<DB, TB>]: {
        [T in TB]: C extends keyof DB[T] ? DB[T][C] : never;
    }[TB];
}>;

interface Compilable<O = unknown> {
    compile(): CompiledQuery<O>;
}

declare type GroupByExpression<DB, TB extends keyof DB, O> = ReferenceExpression<DB, TB> | (keyof O & string);

declare type NoResultErrorConstructor = new (node: QueryNode) => Error;
declare class NoResultError extends Error {
    /**
     * The operation node tree of the query that was executed.
     */
    readonly node: QueryNode;
    constructor(node: QueryNode);
}

declare class SelectQueryBuilder<DB, TB extends keyof DB, O> implements WhereInterface<DB, TB>, HavingInterface<DB, TB>, Expression<O>, Compilable<O>, Explainable {
    #private;
    constructor(props: SelectQueryBuilderProps);
    /** @private */
    /**
     * All expressions need to have this getter for complicated type-related reasons.
     * Simply add this getter for your expression and always return `undefined` from it:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   get expressionType(): T | undefined {
     *     return undefined
     *   }
     * }
     * ```
     *
     * The getter is needed to make the expression assignable to another expression only
     * if the types `T` are assignable. Without this property (or some other property
     * that references `T`), you could assing `Expression<string>` to `Expression<number>`.
     */
    get expressionType(): O | undefined;
    /**
     * Adds a `where` clause to the query.
     *
     * Also see {@link orWhere}, {@link whereExists} and {@link whereRef}.
     *
     * ### Examples
     *
     * Find a row by column value:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 100)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = $1
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use
     *
     * ```ts
     * sql`your operator`
     * ```
     *
     * The next example uses the `>` operator:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '>', 100)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" > $1
     * ```
     *
     * `where` methods don't change the type of the query. You can add
     * conditional statements easily by doing something like this:
     *
     * ```ts
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * This is true for basically all methods execpt the `select` and
     * `returning`, that __do__ change the return type of the query.
     *
     * Both the first and third argument can also be subqueries.
     * A subquery is defined by passing a function and calling
     * the `selectFrom` method of the object passed into the
     * function:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be subqueries or raw
     * {@link sql} expressions.
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * If you only pass one function argument to this method, it can be
     * used to create parentheses around other where statements:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .orWhere(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): SelectQueryBuilder<DB, TB, O>;
    where(grouper: WhereGrouper<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    where(expression: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((qb) => qb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link where}.
     *
     * It's often necessary to wrap `or where` clauses in parentheses to control
     * precendence. You can use the one argument version of the `where` method
     * for that. See the examples.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 1)
     *   .orWhere('id', '=', 2)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = 1 or "id" = 2
     * ```
     *
     * Grouping with parentheses:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * Even the first `where` can be an `orWhere`. This is useful
     * if you are looping through a set of conditions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .orWhere('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     */
    orWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): SelectQueryBuilder<DB, TB, O>;
    orWhere(grouper: WhereGrouper<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    orWhere(expression: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link whereRef}.
     *
     * Also see {@link orWhere} and {@link where}.
     */
    orWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `where exists` clause to the query.
     *
     * You can either use a subquery or a raw {@link sql} snippet.
     *
     * ### Examples
     *
     * The query below selets all persons that own a pet named Catto:
     *
     * ```ts
     * const petName = 'Catto'
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .whereExists((qb) => qb
     *     .selectFrom('pet')
     *     .select('pet.id')
     *     .whereRef('person.id', '=', 'pet.owner_id')
     *     .where('pet.name', '=', petName)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select "pet"."id"
     *   from "pet"
     *   where "person"."id" = "pet"."owner_id"
     *   and "pet"."name" = $1
     * )
     * ```
     *
     * The same query as in the previous example but with using raw {@link sql}:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const petName = 'Catto'
     * db.selectFrom('person')
     *   .selectAll()
     *   .whereExists(
     *     sql`(select pet.id from pet where person.id = pet.owner_id and pet.name = ${petName})`
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select pet.id
     *   from pet
     *   where person.id = pet.owner_id
     *   and pet.name = $1
     * )
     * ```
     */
    whereExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link whereExists} but creates a `not exists` clause.
     */
    whereNotExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link whereExists} but creates an `or exists` clause.
     */
    orWhereExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link whereExists} but creates an `or not exists` clause.
     */
    orWhereNotExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.where | where} but adds a `having` statement
     * instead of a `where` statement.
     */
    having<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): SelectQueryBuilder<DB, TB, O>;
    having(grouper: HavingGrouper<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    having(expression: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.whereRef | whereRef} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.orWhere | orWhere} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHaving<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): SelectQueryBuilder<DB, TB, O>;
    orHaving(grouper: HavingGrouper<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    orHaving(expression: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.orWhereRef | orWhereRef} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHavingRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.whereExists | whereExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.whereNotExists | whereNotExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    havingNotExist(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.orWhereExists | orWhereExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHavingExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link WhereInterface.orWhereNotExists | orWhereNotExists} but adds a `having` statement
     * instead of a `where` statement.
     */
    orHavingNotExists(arg: ExistsExpression<DB, TB>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a select clause to the query.
     *
     * When a column (or any expression) is selected, Kysely adds its type to the return
     * type of the query. Kysely is smart enough to parse the column names and types even
     * from aliased columns, subqueries, raw expressions etc.
     *
     * Kysely only allows you to select columns and expressions that exist and would
     * produce valid SQL. However, Kysely is not perfect and there may be cases where
     * the type inference doesn't work and you need to override it. You can always
     * use the {@link Kysely.dynamic | dynamic} module and the {@link sql} tag
     * to override the types.
     *
     * Select calls are additive. Calling `select('id').select('first_name')` is the
     * same as calling `select(['id', 'first_name']).
     *
     * To select all columns of the query or specific tables see the
     * {@link selectAll} method.
     *
     * See the {@link if} method if you are looking for a way to add selections
     * based on a runtime condition.
     *
     * ### Examples
     *
     * Select a single column:
     *
     * ```ts
     * const persons = await db.selectFrom('person')
     *   .select('id')
     *   .where('first_name', '=', 'Arnold')
     *   .execute()
     *
     * persons[0].id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id" from "person" where "first_name" = $1
     * ```
     *
     * Select a single column and specify a table:
     *
     * ```ts
     * const persons = await db.selectFrom(['person', 'pet'])
     *   .select('person.id')
     *   .execute()
     *
     * persons[0].id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id" from "person", "pet"
     * ```
     *
     * Select multiple columns:
     *
     * ```ts
     * const persons = await db.selectFrom('person')
     *   .select(['person.id', 'first_name'])
     *   .execute()
     *
     * persons[0].id
     * persons[0].first_name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "first_name" from "person"
     * ```
     *
     * Aliased selections:
     *
     * ```ts
     * const persons = await db.selectFrom('person')
     *   .select([
     *     'person.first_name as fn',
     *     'person.last_name as ln'
     *   ])
     *   .execute()
     *
     * persons[0].fn
     * persons[0].ln
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "person"."first_name" as "fn",
     *   "person"."last_name" as "ln"
     * from "person"
     * ```
     *
     * You can also select subqueries and raw sql expressions. Note that you
     * always need to give a name for the selections using the `as`
     * method:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db.selectFrom('person')
     *   .select([
     *     (qb) => qb
     *       .selectFrom('pet')
     *       .whereRef('person.id', '=', 'pet.owner_id')
     *       .select('pet.name')
     *       .limit(1)
     *       .as('pet_name')
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   ])
     *   .execute()
     *
     * persons[0].pet_name
     * persons[0].full_name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   (
     *     select "pet"."name"
     *     from "pet"
     *     where "person"."id" = "pet"."owner_id"
     *     limit $1
     *   ) as "pet_name",
     *   concat(first_name, ' ', last_name) as full_name
     * from "person"
     * ```
     *
     * In case you use the {@link sql} tag you need to specify the type of the expression
     * (in this example `string`).
     *
     * All the examples above assume you know the column names at compile time.
     * While it's better to build your code like that (that way you also know
     * the types) sometimes it's not possible or you just prefer to write more
     * dynamic code.
     * <br><br>
     * In this example, we use the `dynamic` module's methods to add selections
     * dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput = req.query.select;
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
     *
     * const spersons = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput)
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | undefined = persons[0].last_name
     * const firstName: string | undefined = persons[0].first_name
     * const birthDate: string | undefined = persons[0].birth_date
     *
     * // The result type also contains the compile time selection `id`.
     * persons[0].id
     * ```
     */
    select<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): QueryBuilderWithSelection<DB, TB, O, SE>;
    select<SE extends SelectExpression<DB, TB>>(selection: SE): QueryBuilderWithSelection<DB, TB, O, SE>;
    /**
     * Adds `distinct on` expressions to the select clause.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .where('pet.name', '=', 'Doggo')
     *   .distinctOn('person.id')
     *   .selectAll('person')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select distinct on ("person"."id") "person".*
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * where "pet"."name" = $1
     * ```
     */
    distinctOn<RE extends ReferenceExpression<DB, TB>>(selections: ReadonlyArray<RE>): SelectQueryBuilder<DB, TB, O>;
    distinctOn<RE extends ReferenceExpression<DB, TB>>(selection: RE): SelectQueryBuilder<DB, TB, O>;
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `select` keyword.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .modifyFront(sql`sql_no_cache`)
     *   .select('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select sql_no_cache `first_name`
     * from `person`
     * ```
     */
    modifyFront(modifier: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link forUpdate}, {@link forShare}, {@link forKeyShare}, {@link forNoKeyUpdate}
     * {@link skipLocked} and  {@link noWait}.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select('first_name')
     *   .modifyEnd(sql`for update`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * for update
     * ```
     */
    modifyEnd(modifier: Expression<any>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Makes the selection distinct.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select('first_name')
     *   .distinct()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select distinct "first_name" from "person"
     * ```
     */
    distinct(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for update` modifier to a select query on supported databases.
     */
    forUpdate(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for share` modifier to a select query on supported databases.
     */
    forShare(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for key share` modifier to a select query on supported databases.
     */
    forKeyShare(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `for no key update` modifier to a select query on supported databases.
     */
    forNoKeyUpdate(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `skip locked` modifier to a select query on supported databases.
     */
    skipLocked(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds the `nowait` modifier to a select query on supported databases.
     */
    noWait(): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `select *` or `select table.*` clause to the query.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     *
     * Select all columns of a table:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".* from "person"
     * ```
     *
     * Select all columns of multiple tables:
     *
     * ```ts
     * const personsPets = await db
     *   .selectFrom(['person', 'pet'])
     *   .selectAll(['person', 'pet'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, "pet".* from "person", "pet"
     * ```
     */
    selectAll<T extends TB>(table: ReadonlyArray<T>): SelectAllQueryBuilder<DB, TB, O, T>;
    selectAll<T extends TB>(table: T): SelectAllQueryBuilder<DB, TB, O, T>;
    selectAll(): SelectAllQueryBuilder<DB, TB, O, TB>;
    /**
     * Joins another table to the query using an inner join.
     *
     * ### Examples
     *
     * Simple usage by providing a table name and two columns to join:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   // `select` needs to come after the call to `innerJoin` so
     *   // that you can select from the joined table.
     *   .select('person.id', 'pet.name')
     *   .execute()
     *
     * result[0].id
     * result[0].name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "pet"."name"
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * ```
     *
     * You can give an alias for the joined table like this:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet as p', 'p.owner_id', 'person.id')
     *   .where('p.name', '=', 'Doggo')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet" as "p"
     * on "p"."owner_id" = "person"."id"
     * where "p".name" = $1
     * ```
     *
     * You can provide a function as the second argument to get a join
     * builder for creating more complex joins. The join builder has a
     * bunch of `on*` methods for building the `on` clause of the join.
     * There's basically an equivalent for every `where` method
     * (`on`, `onRef`, `onExists` etc.). You can do all the same things
     * with the `on` method that you can with the corresponding `where`
     * method. See the `where` method documentation for more examples.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     'pet',
     *     (join) => join
     *       .onRef('pet.owner_id', '=', 'person.id')
     *       .on('pet.name', '=', 'Doggo')
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * and "pet"."name" = $1
     * ```
     *
     * You can join a subquery by providing a select query (or a callback)
     * as the first argument:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     qb.selectFrom('pet')
     *       .select(['owner_id', 'name'])
     *       .where('name', '=', 'Doggo')
     *       .as('doggos'),
     *     'doggos.owner_id',
     *     'person.id',
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join (
     *   select "owner_id", "name"
     *   from "pet"
     *   where "name" = $1
     * ) as "doggos"
     * on "doggos"."owner_id" = "person"."id"
     * ```
     */
    innerJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    innerJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a left join instead of an inner join.
     */
    leftJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    leftJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a right join instead of an inner join.
     */
    rightJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithRightJoin<DB, TB, O, TE>;
    rightJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithRightJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a full join instead of an inner join.
     */
    fullJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithFullJoin<DB, TB, O, TE>;
    fullJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithFullJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a lateral join instead of an inner join.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .innerJoinLateral(
     *     (eb) =>
     *       eb.selectFrom('pet')
     *         .select('name')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *         .as('p'),
     *     (join) => join.onTrue()
     *   )
     *   .select(['first_name', 'p.name'])
     *   .orderBy('first_name')
     */
    innerJoinLateral<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    innerJoinLateral<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a lateral left join instead of an inner join.
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .leftJoinLateral(
     *     (eb) =>
     *       eb.selectFrom('pet')
     *         .select('name')
     *         .whereRef('pet.owner_id', '=', 'person.id')
     *         .as('p'),
     *     (join) => join.onTrue()
     *   )
     *   .select(['first_name', 'p.name'])
     *   .orderBy('first_name')
     * ```
     */
    leftJoinLateral<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    leftJoinLateral<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): SelectQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
     * multiple times.
     *
     * The first argument is the expression to order by and the second is the
     * order (`asc` or `desc`).
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('person.first_name as fn')
     *   .orderBy('id')
     *   .orderBy('fn', 'desc')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "id" asc, "fn" desc
     * ```
     *
     * The order by expression can also be a raw sql expression or a subquery
     * in addition to column references:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy((qb) => qb.selectFrom('pet')
     *     .select('pet.name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *   )
     *   .orderBy(
     *     sql`concat(first_name, last_name)`
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * order by
     *   ( select "pet"."name"
     *     from "pet"
     *     where "pet"."owner_id" = "person"."id"
     *     limit 1
     *   ) asc,
     *   concat(first_name, last_name) asc
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "fn" asc
     * ```
     */
    orderBy(orderBy: OrderByExpression<DB, TB, O>, direction?: OrderByDirectionExpression): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a `group by` clause to the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     sql`max(id)`.as('max_id')
     *   ])
     *   .groupBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", max(id)
     * from "person"
     * group by "first_name"
     * ```
     *
     * `groupBy` also accepts an array:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     sql`max(id)`.as('max_id')
     *   ])
     *   .groupBy([
     *     'first_name',
     *     'last_name'
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", "last_name", max(id)
     * from "person"
     * group by "first_name", "last_name"
     * ```
     *
     * The group by expressions can also be subqueries or
     * raw sql expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     sql`max(id)`.as('max_id')
     *   ])
     *   .groupBy([
     *     sql`concat(first_name, last_name)`,
     *     (qb) => qb.selectFrom('pet').select('id').limit(1)
     *   ])
     *   .execute()
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(groupBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('first_name')
     *     .groupBy(ref(groupBy))
     *     .execute()
     * }
     *
     * someQuery('first_name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * group by "first_name"
     * ```
     */
    groupBy(groupBy: ReadonlyArray<GroupByExpression<DB, TB, O>>): SelectQueryBuilder<DB, TB, O>;
    groupBy(groupBy: GroupByExpression<DB, TB, O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds a limit clause to the query.
     *
     * ### Examples
     *
     * Select the first 10 rows of the result:
     *
     * ```ts
     * return await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .limit(10)
     * ```
     *
     * Select rows from index 10 to index 19 of the result:
     *
     * ```ts
     * return await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .offset(10)
     *   .limit(10)
     * ```
     */
    limit(limit: number): SelectQueryBuilder<DB, TB, O>;
    /**
     * Adds an offset clause to the query.
     *
     * ### Examples
     *
     * Select rows from index 10 to index 19 of the result:
     *
     * ```ts
     * return await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .offset(10)
     *   .limit(10)
     * ```
     */
    offset(offset: number): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `union`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .union(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    union(expression: Expression<O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `union all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .unionAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    unionAll(expression: Expression<O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `intersect`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersect(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    intersect(expression: Expression<O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `intersect all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersectAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    intersectAll(expression: Expression<O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `except`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .except(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    except(expression: Expression<O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Combines another select query or raw expression to this query using `except all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .exceptAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    exceptAll(expression: Expression<O>): SelectQueryBuilder<DB, TB, O>;
    /**
     * Simply calls the given function passing `this` as the only argument.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link if} method.
     *
     * ### Examples
     *
     * The next example uses a helper funtion `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.selectFrom('person')
     *   .selectAll()
     *   .call(log)
     *   .execute()
     * ```
     */
    call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `select` or `selectAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * Also see [this recipe](https://github.com/koskimas/kysely/tree/master/recipes/conditional-selects.md)
     *
     * ### Examples
     *
     * ```ts
     * async function getPerson(id: number, withLastName: boolean) {
     *   return await db
     *     .selectFrom('person')
     *     .select(['id', 'first_name'])
     *     .if(withLastName, (qb) => qb.select('last_name'))
     *     .where('id', '=', id)
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `getPerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     *
     * You can also call any other methods inside the callback:
     *
     * ```ts
     * const { count } = db.fn
     *
     * db.selectFrom('person')
     *   .select('person.id')
     *   .if(filterByFirstName, (qb) => qb.where('first_name', '=', firstName))
     *   .if(filterByPetCount, (qb) => qb
     *     .innerJoin('pet', 'pet.owner_id', 'person.id')
     *     .having(count('pet.id'), '>', petCountLimit)
     *     .groupBy('person.id')
     *   )
     * ```
     */
    if<O2 extends O>(condition: boolean, func: (qb: this) => SelectQueryBuilder<DB, TB, O2>): SelectQueryBuilder<DB, TB, MergePartial<O, O2>>;
    /**
     * Gives an alias for the query. This method is only useful for sub queries.
     *
     * ### Examples
     *
     * ```ts
     * const pets = await db.selectFrom('pet')
     *   .selectAll('pet')
     *   .select(
     *     (qb) => qb.selectFrom('person')
     *       .select('first_name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .as('owner_first_name')
     *   )
     *   .execute()
     *
     * pets[0].owner_first_name
     * ```
     */
    as<A extends string>(alias: A): AliasedSelectQueryBuilder<DB, TB, O, A>;
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    castTo<T>(): SelectQueryBuilder<DB, TB, T>;
    /**
     * Returns a copy of this SelectQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): SelectQueryBuilder<DB, TB, O>;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): SelectQueryNode;
    compile(): CompiledQuery<O>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<O[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SingleResultType<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor): Promise<O>;
    /**
     * Executes the query and streams the rows.
     *
     * The optional argument `chunkSize` defines how many rows to fetch from the database
     * at a time. It only affects some dialects like PostgreSQL that support it.
     *
     * ### Examples
     *
     * ```ts
     * const stream = db.
     *   .selectFrom('person')
     *   .select(['first_name', 'last_name'])
     *   .where('gender', '=', 'other')
     *   .stream()
     *
     * for await (const person of stream) {
     *   console.log(person.first_name)
     *
     *   if (person.last_name === 'Something') {
     *     // Breaking or returning before the stream has ended will release
     *     // the database connection and invalidate the stream.
     *     break
     *   }
     * }
     * ```
     */
    stream(chunkSize?: number): AsyncIterableIterator<O>;
    /**
     * Executes query with `explain` statement before `select` keyword.
     *
     * ```ts
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json select * from `person` where `gender` = ?
     * ```
     *
     * You can also execute `explain analyze` statements.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const explained = await db
     *  .selectFrom('person')
     *  .where('gender', '=', 'female')
     *  .selectAll()
     *  .explain('json', sql`analyze`)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * explain (analyze, format json) select * from "person" where "gender" = $1
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface SelectQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: SelectQueryNode;
    readonly executor: QueryExecutor;
}
/**
 * {@link SelectQueryBuilder} with an alias. The result of calling {@link SelectQueryBuilder.as}.
 */
declare class AliasedSelectQueryBuilder<DB, TB extends keyof DB, O = undefined, A extends string = never> implements AliasedExpression<O, A> {
    #private;
    constructor(queryBuilder: SelectQueryBuilder<DB, TB, O>, alias: A);
    /** @private */
    /**
     * Returns the aliased expression.
     */
    get expression(): Expression<O>;
    /** @private */
    /**
     * Returns the alias.
     */
    get alias(): A;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     */
    toOperationNode(): AliasNode;
}
declare type SelectQueryBuilderWithInnerJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? InnerJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? SelectQueryBuilder<DB, TB | TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$2<DB, TB, O, QA, QO> : never;
declare type InnerJoinedBuilder$2<DB, TB extends keyof DB, O, A extends string, R> = A extends keyof DB ? SelectQueryBuilder<InnerJoinedDB$2<DB, A, R>, TB | A, O> : SelectQueryBuilder<DB & Record<A, R>, TB | A, O>;
declare type InnerJoinedDB$2<DB, A extends string, R> = {
    [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never;
};
declare type SelectQueryBuilderWithLeftJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? LeftJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? LeftJoinedBuilder$2<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$2<DB, TB, O, QA, QO> : never;
declare type LeftJoinedBuilder$2<DB, TB extends keyof DB, O, A extends keyof any, R> = A extends keyof DB ? SelectQueryBuilder<LeftJoinedDB$2<DB, A, R>, TB | A, O> : SelectQueryBuilder<DB & Record<A, Nullable<R>>, TB | A, O>;
declare type LeftJoinedDB$2<DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends keyof DB ? DB[C] : never;
};
declare type SelectQueryBuilderWithRightJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? RightJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? RightJoinedBuilder$2<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$2<DB, TB, O, QA, QO> : never;
declare type RightJoinedBuilder$2<DB, TB extends keyof DB, O, A extends keyof any, R> = SelectQueryBuilder<RightJoinedDB$2<DB, TB, A, R>, TB | A, O>;
declare type RightJoinedDB$2<DB, TB extends keyof DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? R : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
};
declare type SelectQueryBuilderWithFullJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? OuterJoinedBuilder$2<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? OuterJoinedBuilder$2<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$2<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$2<DB, TB, O, QA, QO> : never;
declare type OuterJoinedBuilder$2<DB, TB extends keyof DB, O, A extends keyof any, R> = SelectQueryBuilder<OuterJoinedBuilderDB$2<DB, TB, A, R>, TB | A, O>;
declare type OuterJoinedBuilderDB$2<DB, TB extends keyof DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
};

/**
 * The result of an insert query.
 *
 * If the table has an auto incrementing primary key {@link insertId} will hold
 * the generated id on dialects that support it. For example PostgreSQL doesn't
 * return the id by default and {@link insertId} is undefined. On PostgreSQL you
 * need to use {@link ReturningInterface.returning} or {@link ReturningInterface.returningAll}
 * to get out the inserted id.
 *
 * {@link numInsertedOrUpdatedRows} holds the number of (actually) inserted rows.
 * On MySQL, updated rows are counted twice when using `on duplicate key update`.
 *
 * ### Examples
 *
 * ```ts
 * const result = await db
 *   .insertInto('person')
 *   .values(person)
 *   .executeTakeFirst()
 *
 * console.log(result.insertId)
 * ```
 */
declare class InsertResult {
    #private;
    constructor(insertId: bigint | undefined, numInsertedOrUpdatedRows: bigint | undefined);
    /**
     * The auto incrementing primary key
     */
    get insertId(): bigint | undefined;
    /**
     * Affected rows count.
     */
    get numInsertedOrUpdatedRows(): bigint | undefined;
}

declare class DeleteResult {
    #private;
    constructor(numDeletedRows: bigint);
    get numDeletedRows(): bigint;
}

declare class UpdateResult {
    #private;
    constructor(numUpdatedRows: bigint);
    get numUpdatedRows(): bigint;
}

/**
 * Given an object type, extracts the union of all value types.
 */
declare type ValueType<T> = T[keyof T];
/**
 * Given a database type and a union of table names in that db, returns
 * a union type with all possible column names.
 *
 * Example:
 *
 * ```ts
 * interface Person {
 *   id: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * interface Movie {
 *   stars: number
 * }
 *
 * interface Database {
 *   person: Person
 *   pet: Pet
 *   movie: Movie
 * }
 *
 * type Columns = AnyColumn<Database, 'person' | 'pet'>
 *
 * // Columns == 'id' | 'name' | 'species'
 * ```
 */
declare type AnyColumn<DB, TB extends keyof DB> = {
    [T in TB]: keyof DB[T];
}[TB] & string;
/**
 * Extracts a column type.
 */
declare type ExtractColumnType<DB, TB extends keyof DB, C> = {
    [T in TB]: C extends keyof DB[T] ? DB[T][C] : never;
}[TB];
/**
 * Given a database type and a union of table names in that db, returns
 * a union type with all possible `table`.`column` combinations.
 *
 * Example:
 *
 * ```ts
 * interface Person {
 *   id: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * interface Movie {
 *   stars: number
 * }
 *
 * interface Database {
 *   person: Person
 *   pet: Pet
 *   movie: Movie
 * }
 *
 * type Columns = AnyColumnWithTable<Database, 'person' | 'pet'>
 *
 * // Columns == 'person.id' | 'pet.name' | 'pet.species'
 * ```
 */
declare type AnyColumnWithTable<DB, TB extends keyof DB> = {
    [T in TB]: T extends string ? keyof DB[T] extends string ? `${T}.${keyof DB[T]}` : never : never;
}[TB];
/**
 * Just like {@link AnyColumn} but with a ` as <string>` suffix.
 */
declare type AnyAliasedColumn<DB, TB extends keyof DB> = {
    [T in TB]: T extends string ? keyof DB[T] extends string ? `${keyof DB[T]} as ${string}` : never : never;
}[TB];
/**
 * Just like {@link AnyColumnWithTable} but with a ` as <string>` suffix.
 */
declare type AnyAliasedColumnWithTable<DB, TB extends keyof DB> = {
    [T in TB]: T extends string ? keyof DB[T] extends string ? `${T}.${keyof DB[T]} as ${string}` : never : never;
}[TB];
/**
 * Extracts the item type of an array.
 */
declare type ArrayItemType<T> = T extends ReadonlyArray<infer I> ? I : never;
declare type AnySelectQueryBuilder = SelectQueryBuilder<any, any, any>;
declare type SingleResultType<O> = O extends InsertResult ? O : O extends DeleteResult ? O : O extends UpdateResult ? O : O | undefined;
declare type UnknownRow = Record<string, unknown>;
declare type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
/**
 * Takes all properties from T1 and merges all properties from T2
 * that don't exist in T1 as optional properties.
 *
 * Example:
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * interface Pet {
 *   name: string
 *   species: 'cat' | 'dog'
 * }
 *
 * type Merged = MergePartial<Person, Pet>
 *
 * // { name: string, age: number, species?: 'cat' | 'dog' }
 */
declare type MergePartial<T1, T2> = T1 & Partial<Omit<T2, keyof T1>>;
declare type IsNever<T> = [T] extends [never] ? true : false;
declare type Equals<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false;

/**
 * A Driver creates and releases {@link DatabaseConnection | database connections}
 * and is also responsible for connection pooling (if the dialect supports pooling).
 */
interface Driver {
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: DatabaseConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
interface TransactionSettings {
    readonly isolationLevel?: IsolationLevel;
}
declare const TRANSACTION_ISOLATION_LEVELS: readonly ["read uncommitted", "read committed", "repeatable read", "serializable"];
declare type IsolationLevel = ArrayItemType<typeof TRANSACTION_ISOLATION_LEVELS>;

/**
 * An interface for getting the database metadata (names of the tables and columns etc.)
 */
interface DatabaseIntrospector {
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get table metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}
interface DatabaseMetadataOptions {
    /**
     * If this is true, the metadata contains the internal kysely tables
     * such as the migration tables.
     */
    withInternalKyselyTables: boolean;
}
interface SchemaMetadata {
    readonly name: string;
}
interface DatabaseMetadata {
    /**
     * The tables found in the database.
     */
    readonly tables: TableMetadata[];
}
interface TableMetadata {
    readonly name: string;
    readonly columns: ColumnMetadata[];
    readonly schema?: string;
}
interface ColumnMetadata {
    readonly name: string;
    /**
     * The data type of the column as reported by the database.
     *
     * NOTE: This value is whatever the database engine returns and it will be
     *       different on different dialects even if you run the same migrations.
     *       For example `integer` datatype in a migration will produce `int4`
     *       on PostgreSQL, `INTEGER` on SQLite and `int` on MySQL.
     */
    readonly dataType: string;
    /**
     * The schema this column's data type was created in.
     */
    readonly dataTypeSchema?: string;
    readonly isAutoIncrementing: boolean;
    readonly isNullable: boolean;
    readonly hasDefaultValue: boolean;
}

/**
 * A Dialect is the glue between Kysely and the underlying database engine.
 *
 * See the built-in {@link PostgresDialect} as an example of a dialect.
 * Users can implement their own dialects and use them by passing it
 * in the {@link KyselyConfig.dialect} property.
 */
interface Dialect {
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare type DefaultValueExpression = unknown | Expression<unknown>;

declare class ColumnDefinitionBuilder implements OperationNodeSource {
    #private;
    constructor(node: ColumnDefinitionNode);
    /**
     * Adds `auto_increment` or `autoincrement` to the column definition
     * depending on the dialect.
     *
     * Some dialects like PostgreSQL don't support this. On PostgreSQL
     * you can use the `serial` or `bigserial` data type instead.
     */
    autoIncrement(): ColumnDefinitionBuilder;
    /**
     * Makes the column the primary key.
     *
     * If you want to specify a composite primary key use the
     * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
     */
    primaryKey(): ColumnDefinitionBuilder;
    /**
     * Adds a foreign key constraint for the column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * col.references('person.id')
     * ```
     */
    references(ref: string): ColumnDefinitionBuilder;
    /**
     * Adds an `on delete` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * col.references('person.id').onDelete('cascade')
     * ```
     */
    onDelete(onDelete: OnModifyForeignAction): ColumnDefinitionBuilder;
    /**
     * Adds an `on update` constraint for the foreign key column.
     *
     * ### Examples
     *
     * ```ts
     * col.references('person.id').onUpdate('cascade')
     * ```
     */
    onUpdate(onUpdate: OnModifyForeignAction): ColumnDefinitionBuilder;
    /**
     * Adds a unique constraint for the column.
     */
    unique(): ColumnDefinitionBuilder;
    /**
     * Adds a `not null` constraint for the column.
     */
    notNull(): ColumnDefinitionBuilder;
    /**
     * Adds a `unsigned` modifier for the column.
     *
     * This only works on some dialects like MySQL.
     */
    unsigned(): ColumnDefinitionBuilder;
    /**
     * Adds a default value constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
     *   .execute()
     * ```
     *
     * Values passed to `defaultTo` are interpreted as value literals by default. You can define
     * an arbitrary SQL expression using the {@link sql} template tag:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'number_of_legs',
     *     'integer',
     *     (col) => col.defaultTo(sql`any SQL here`)
     *   )
     *   .execute()
     * ```
     */
    defaultTo(value: DefaultValueExpression): ColumnDefinitionBuilder;
    /**
     * Adds a check constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) =>
     *     col.check(sql`number_of_legs < 5`)
     *   )
     *   .execute()
     * ```
     */
    check(expression: Expression<any>): ColumnDefinitionBuilder;
    /**
     * Makes the column a generated column using a `generated always as` statement.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)',
     *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *   )
     *   .execute()
     * ```
     */
    generatedAlwaysAs(expression: Expression<any>): ColumnDefinitionBuilder;
    /**
     * Adds the `generated always as identity` specifier on supported dialects.
     */
    generatedAlwaysAsIdentity(): ColumnDefinitionBuilder;
    /**
     * Adds the `generated by default as identity` specifier on supported dialects.
     */
    generatedByDefaultAsIdentity(): ColumnDefinitionBuilder;
    /**
     * Makes a generated column stored instead of virtual. This method can only
     * be used with {@link generatedAlwaysAs}
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)', (col) => col
     *     .generatedAlwaysAs("concat(first_name, ' ', last_name)")
     *     .stored()
     *   )
     *   .execute()
     * ```
     */
    stored(): ColumnDefinitionBuilder;
    /**
     * This can be used to add any additional SQL right after the column's data type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *  .addColumn('id', 'integer', col => col.primaryKey())
     *  .addColumn('first_name', 'varchar(36)', col => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull())
     *  .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(36) collate utf8mb4_general_ci not null
     * )
     * ```
     */
    modifyFront(modifier: Expression<any>): ColumnDefinitionBuilder;
    /**
     * This can be used to add any additional SQL to the end of the column definition.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *  .addColumn('id', 'integer', col => col.primaryKey())
     *  .addColumn('age', 'integer', col => col.unsigned().notNull().modifyEnd(sql`comment ${sql.literal('it is not polite to ask a woman her age')}`))
     *  .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
     * )
     * ```
     */
    modifyEnd(modifier: Expression<any>): ColumnDefinitionBuilder;
    toOperationNode(): ColumnDefinitionNode;
}
declare type ColumnDefinitionBuilderCallback = (builder: ColumnDefinitionBuilder) => ColumnDefinitionBuilder;

declare type DataTypeExpression = ColumnDataType | Expression<any>;

interface ForeignKeyConstraintBuilderInterface<R> {
    onDelete(onDelete: OnModifyForeignAction): R;
    onUpdate(onUpdate: OnModifyForeignAction): R;
}
declare class ForeignKeyConstraintBuilder implements ForeignKeyConstraintBuilderInterface<ForeignKeyConstraintBuilder>, OperationNodeSource {
    #private;
    constructor(node: ForeignKeyConstraintNode);
    onDelete(onDelete: OnModifyForeignAction): ForeignKeyConstraintBuilder;
    onUpdate(onUpdate: OnModifyForeignAction): ForeignKeyConstraintBuilder;
    toOperationNode(): ForeignKeyConstraintNode;
}

declare class AlterColumnBuilder {
    protected readonly alterColumnNode: AlterColumnNode;
    constructor(alterColumnNode: AlterColumnNode);
    setDataType(dataType: ColumnDataType): AlteredColumnBuilder;
    setDefault(value: DefaultValueExpression): AlteredColumnBuilder;
    dropDefault(): AlteredColumnBuilder;
    setNotNull(): AlteredColumnBuilder;
    dropNotNull(): AlteredColumnBuilder;
}
/**
 * Allows us to force consumers to do something, anything, when altering a column.
 *
 * Basically, deny the following:
 *
 * ```ts
 * db.schema.alterTable('person').alterColumn('age', (ac) => ac)
 * ```
 *
 * Which would now throw a compilation error, instead of a runtime error.
 */
declare class AlteredColumnBuilder extends AlterColumnBuilder implements OperationNodeSource {
    toOperationNode(): AlterColumnNode;
}
declare type AlterColumnBuilderCallback = (builder: AlterColumnBuilder) => AlteredColumnBuilder;

/**
 * This builder can be used to create a `alter table` query.
 */
declare class AlterTableBuilder implements ColumnAlteringInterface {
    #private;
    constructor(props: AlterTableBuilderProps);
    renameTo(newTableName: string): AlterTableExecutor;
    setSchema(newSchema: string): AlterTableExecutor;
    alterColumn(column: string, alteration: AlterColumnBuilderCallback): AlterTableColumnAlteringBuilder;
    dropColumn(column: string): AlterTableColumnAlteringBuilder;
    renameColumn(column: string, newColumn: string): AlterTableColumnAlteringBuilder;
    /**
     * See {@link CreateTableBuilder.addColumn}
     */
    addColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    /**
     * Creates an `alter table modify column` query. The `modify column` statement
     * is only implemeted by MySQL and oracle AFAIK. On other databases you
     * should use the `alterColumn` method.
     */
    modifyColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    /**
     * See {@link CreateTableBuilder.addUniqueConstraint}
     */
    addUniqueConstraint(constraintName: string, columns: string[]): AlterTableExecutor;
    /**
     * See {@link CreateTableBuilder.addCheckConstraint}
     */
    addCheckConstraint(constraintName: string, checkExpression: Expression<any>): AlterTableExecutor;
    /**
     * See {@link CreateTableBuilder.addForeignKeyConstraint}
     *
     * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
     * the constraint builder and doesn't take a callback as the last argument. This
     * is because you can only add one column per `ALTER TABLE` query.
     */
    addForeignKeyConstraint(constraintName: string, columns: string[], targetTable: string, targetColumns: string[]): AlterTableAddForeignKeyConstraintBuilder;
    dropConstraint(constraintName: string): AlterTableDropConstraintBuilder;
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * See {@link CreateTableBuilder.call}
     */
    call<T>(func: (qb: this) => T): T;
}
interface AlterTableBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: AlterTableNode;
}
declare class AlterTableExecutor implements OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableExecutorProps);
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableExecutorProps extends AlterTableBuilderProps {
}
interface ColumnAlteringInterface {
    alterColumn(column: string, alteration: AlterColumnBuilderCallback): ColumnAlteringInterface;
    dropColumn(column: string): ColumnAlteringInterface;
    renameColumn(column: string, newColumn: string): ColumnAlteringInterface;
    /**
     * See {@link CreateTableBuilder.addColumn}
     */
    addColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): ColumnAlteringInterface;
    /**
     * Creates an `alter table modify column` query. The `modify column` statement
     * is only implemeted by MySQL and oracle AFAIK. On other databases you
     * should use the `alterColumn` method.
     */
    modifyColumn(columnName: string, dataType: DataTypeExpression, build: ColumnDefinitionBuilderCallback): ColumnAlteringInterface;
}
declare class AlterTableColumnAlteringBuilder implements ColumnAlteringInterface, OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableColumnAlteringBuilderProps);
    alterColumn(column: string, alteration: AlterColumnBuilderCallback): AlterTableColumnAlteringBuilder;
    dropColumn(column: string): AlterTableColumnAlteringBuilder;
    renameColumn(column: string, newColumn: string): AlterTableColumnAlteringBuilder;
    /**
     * See {@link CreateTableBuilder.addColumn}
     */
    addColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    /**
     * Creates an `alter table modify column` query. The `modify column` statement
     * is only implemeted by MySQL and oracle AFAIK. On other databases you
     * should use the `alterColumn` method.
     */
    modifyColumn(columnName: string, dataType: DataTypeExpression, build?: ColumnDefinitionBuilderCallback): AlterTableColumnAlteringBuilder;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableColumnAlteringBuilderProps extends AlterTableBuilderProps {
}
declare class AlterTableAddForeignKeyConstraintBuilder implements ForeignKeyConstraintBuilderInterface<AlterTableAddForeignKeyConstraintBuilder>, OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableAddForeignKeyConstraintBuilderProps);
    onDelete(onDelete: OnModifyForeignAction): AlterTableAddForeignKeyConstraintBuilder;
    onUpdate(onUpdate: OnModifyForeignAction): AlterTableAddForeignKeyConstraintBuilder;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableAddForeignKeyConstraintBuilderProps extends AlterTableBuilderProps {
    readonly constraintBuilder: ForeignKeyConstraintBuilder;
}
declare class AlterTableDropConstraintBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: AlterTableDropConstraintBuilderProps);
    ifExists(): AlterTableDropConstraintBuilder;
    cascade(): AlterTableDropConstraintBuilder;
    restrict(): AlterTableDropConstraintBuilder;
    toOperationNode(): AlterTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface AlterTableDropConstraintBuilderProps extends AlterTableBuilderProps {
}

declare class CreateIndexBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateIndexBuilderProps);
    /**
     * Makes the index unique.
     */
    unique(): CreateIndexBuilder;
    /**
     * Specifies the table for the index.
     */
    on(table: string): CreateIndexBuilder;
    /**
     * Specifies the column for the index.
     *
     * Also see the `expression` for specifying an arbitrary expression.
     */
    column(column: string): CreateIndexBuilder;
    /**
     * Specifies a list of columns for the index.
     *
     * Also see the `expression` for specifying an arbitrary expression.
     */
    columns(columns: string[]): CreateIndexBuilder;
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     */
    expression(expression: Expression<any>): CreateIndexBuilder;
    /**
     * Specifies the index type.
     */
    using(indexType: IndexType): CreateIndexBuilder;
    using(indexType: string): CreateIndexBuilder;
    toOperationNode(): CreateIndexNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateIndexBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateIndexNode;
}

declare class CreateSchemaBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateSchemaBuilderProps);
    ifNotExists(): CreateSchemaBuilder;
    toOperationNode(): CreateSchemaNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateSchemaBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateSchemaNode;
}

/**
 * This builder can be used to create a `create table` query.
 */
declare class CreateTableBuilder<TB extends string, C extends string = never> implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateTableBuilderProps);
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */
    temporary(): CreateTableBuilder<TB, C>;
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */
    onCommit(onCommit: OnCommitAction): CreateTableBuilder<TB, C>;
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */
    ifNotExists(): CreateTableBuilder<TB, C>;
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey()),
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   .addColumn('data', sql`some_type`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade'))
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databses. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk', ['parent_id'], 'person', ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey()),
     * ```
     */
    addColumn<CN extends string>(columnName: CN, dataType: DataTypeExpression, build?: ColumnBuilderCallback): CreateTableBuilder<TB, C | CN>;
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     * ```
     */
    addPrimaryKeyConstraint(constraintName: string, columns: C[]): CreateTableBuilder<TB, C>;
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'])
     * ```
     */
    addUniqueConstraint(constraintName: string, columns: C[]): CreateTableBuilder<TB, C>;
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     * ```
     */
    addCheckConstraint(constraintName: string, checkExpression: Expression<any>): CreateTableBuilder<TB, C>;
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addForeignKeyConstraint(
     *   'owner_id_foreign',
     *   ['owner_id'],
     *   'person',
     *   ['id'],
     * )
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * addForeignKeyConstraint(
     *   'owner_id_foreign',
     *   ['owner_id1', 'owner_id2'],
     *   'person',
     *   ['id1', 'id2'],
     *   (cb) => cb.onDelete('cascade')
     * )
     * ```
     */
    addForeignKeyConstraint(constraintName: string, columns: C[], targetTable: string, targetColumns: string[], build?: ForeignKeyConstraintBuilderCallback): CreateTableBuilder<TB, C>;
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64), col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */
    modifyFront(modifier: Expression<any>): CreateTableBuilder<TB, C>;
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *   .addColumn('id', 'integer', col => col => primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64), col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */
    modifyEnd(modifier: Expression<any>): CreateTableBuilder<TB, C>;
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('test')
     *   .call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * ```ts
     * const addDefaultColumns = <T extends string, C extends string = never>(
     *   builder: CreateTableBuilder<T, C>
     * ) => {
     *   return builder
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * db.schema
     *   .createTable('test')
     *   .call(addDefaultColumns)
     *   .execute()
     * ```
     */
    call<T>(func: (qb: this) => T): T;
    toOperationNode(): CreateTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateTableBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateTableNode;
}
declare type ColumnBuilderCallback = (builder: ColumnDefinitionBuilder) => ColumnDefinitionBuilder;
declare type ForeignKeyConstraintBuilderCallback = (builder: ForeignKeyConstraintBuilder) => ForeignKeyConstraintBuilder;

declare class DropIndexBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropIndexBuilderProps);
    /**
     * Specifies the table the index was created for. This is not needed
     * in all dialects.
     */
    on(table: string): DropIndexBuilder;
    ifExists(): DropIndexBuilder;
    cascade(): DropIndexBuilder;
    toOperationNode(): DropIndexNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropIndexBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropIndexNode;
}

declare class DropSchemaBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropSchemaBuilderProps);
    ifExists(): DropSchemaBuilder;
    cascade(): DropSchemaBuilder;
    toOperationNode(): DropSchemaNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropSchemaBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropSchemaNode;
}

declare class DropTableBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropTableBuilderProps);
    ifExists(): DropTableBuilder;
    cascade(): DropTableBuilder;
    toOperationNode(): DropTableNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropTableBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropTableNode;
}

declare class CreateViewBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateViewBuilderProps);
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary view.
     */
    temporary(): CreateViewBuilder;
    materialized(): CreateViewBuilder;
    /**
     * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
     */
    ifNotExists(): CreateViewBuilder;
    orReplace(): CreateViewBuilder;
    columns(columns: string[]): CreateViewBuilder;
    /**
     * Sets the select query or a `values` statement that creates the view.
     *
     * WARNING!
     * Some dialects don't support parameterized queries in DDL statements and therefore
     * the query or raw {@link sql } expression passed here is interpolated into a single
     * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
     * into the query or raw expression passed to this method!
     */
    as(query: AnySelectQueryBuilder | RawBuilder<any>): CreateViewBuilder;
    toOperationNode(): CreateViewNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateViewBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateViewNode;
}

declare class DropViewBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropViewBuilderProps);
    materialized(): DropViewBuilder;
    ifExists(): DropViewBuilder;
    cascade(): DropViewBuilder;
    toOperationNode(): DropViewNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropViewBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropViewNode;
}

declare class CreateTypeBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: CreateTypeBuilderProps);
    toOperationNode(): CreateTypeNode;
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */
    asEnum(values: string[]): CreateTypeBuilder;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface CreateTypeBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: CreateTypeNode;
}

declare class DropTypeBuilder implements OperationNodeSource, Compilable {
    #private;
    constructor(props: DropTypeBuilderProps);
    ifExists(): DropTypeBuilder;
    toOperationNode(): DropTypeNode;
    compile(): CompiledQuery;
    execute(): Promise<void>;
}
interface DropTypeBuilderProps {
    readonly queryId: QueryId;
    readonly executor: QueryExecutor;
    readonly node: DropTypeNode;
}

/**
 * Provides methods for building database schema.
 */
declare class SchemaModule {
    #private;
    constructor(executor: QueryExecutor);
    /**
     * Create a new table.
     *
     * ### Examples
     *
     * This example creates a new table with columns `id`, `first_name`,
     * `last_name` and `gender`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('first_name', 'varchar', col => col.notNull())
     *   .addColumn('last_name', 'varchar', col => col.notNull())
     *   .addColumn('gender', 'varchar')
     *   .execute()
     * ```
     *
     * This example creates a table with a foreign key. Not all database
     * engines support column-level foreign key constraint definitions.
     * For example if you are using MySQL 5.X see the next example after
     * this one.
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer', col => col
     *     .references('person.id')
     *     .onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * This example adds a foreign key constraint for a columns just
     * like the previous example, but using a table-level statement.
     * On MySQL 5.X you need to define foreign key constraints like
     * this:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
     *     (constraint) => constraint.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    createTable<TB extends string>(table: TB): CreateTableBuilder<TB, never>;
    /**
     * Drop a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropTable('person')
     *   .execute()
     * ```
     */
    dropTable(table: string): DropTableBuilder;
    /**
     * Create a new index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createIndex('person_full_name_unique_index')
     *   .on('person')
     *   .columns(['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    createIndex(indexName: string): CreateIndexBuilder;
    /**
     * Drop an index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropIndex('person_full_name_unique_index')
     *   .execute()
     * ```
     */
    dropIndex(indexName: string): DropIndexBuilder;
    /**
     * Create a new schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createSchema('some_schema')
     *   .execute()
     * ```
     */
    createSchema(schema: string): CreateSchemaBuilder;
    /**
     * Drop a schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropSchema('some_schema')
     *   .execute()
     * ```
     */
    dropSchema(schema: string): DropSchemaBuilder;
    /**
     * Alter a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .alterColumn('first_name')
     *   .setDataType('text')
     *   .execute()
     * ```
     */
    alterTable(table: string): AlterTableBuilder;
    /**
     * Create a new view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createView('dogs')
     *   .orReplace()
     *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
     *   .execute()
     * ```
     */
    createView(viewName: string): CreateViewBuilder;
    /**
     * Drop a view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropView('dogs')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropView(viewName: string): DropViewBuilder;
    /**
     * Create a new type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createType('species')
     *   .asEnum(['dog', 'cat', 'frog'])
     *   .execute()
     * ```
     */
    createType(typeName: string): CreateTypeBuilder;
    /**
     * Drop a type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropType('species')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropType(typeName: string): DropTypeBuilder;
    /**
     * Returns a copy of this schema module with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): SchemaModule;
    /**
     * Returns a copy of this schema module  without any plugins.
     */
    withoutPlugins(): SchemaModule;
    /**
     * See {@link QueryCreator.withSchema}
     */
    withSchema(schema: string): SchemaModule;
}

declare class DynamicModule {
    /**
     * Creates a dynamic reference to a column that is not know at compile time.
     *
     * Kysely is built in a way that by default you can't refer to tables or columns
     * that are not actually visible in the current query and context. This is all
     * done by typescript at compile time, which means that you need to know the
     * columns and tables at compile time. This is not always the case of course.
     *
     * This method is meant to be used in those cases where the column names
     * come from the user input or are not otherwise known at compile time.
     *
     * WARNING! Unlike values, column names are not escaped by the database engine
     * or Kysely and if you pass in unchecked column names using this method, you
     * create an SQL injection vulnerability. Always __always__ validate the user
     * input before passing it to this method.
     *
     * There are couple of examples below for some use cases, but you can pass
     * `ref` to other methods as well. If the types allow you to pass a `ref`
     * value to some place, it should work.
     *
     * ### Examples
     *
     * Filter by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(filterColumn: string, filterValue: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where(ref(filterColumn), '=', filterValue)
     *     .execute()
     * }
     *
     * someQuery('first_name', 'Arnold')
     * someQuery('person.last_name', 'Aniston')
     * ```
     *
     * Order by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * In this example we add selections dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput = req.query.select;
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
     *
     * const [person] = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput)
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | undefined = person.last_name
     * const firstName: string | undefined = person.first_name
     * const birthDate: string | undefined = person.birth_date
     *
     * // The result type also contains the compile time selection `id`.
     * person.id
     * ```
     */
    ref<R extends string = never>(reference: string): DynamicReferenceBuilder<R>;
}

declare type ValuesItemNode = ValueListNode | PrimitiveValueListNode;
interface ValuesNode extends OperationNode {
    readonly kind: 'ValuesNode';
    readonly values: ReadonlyArray<ValuesItemNode>;
}
/**
 * @internal
 */
declare const ValuesNode: Readonly<{
    is(node: OperationNode): node is ValuesNode;
    create(values: ReadonlyArray<ValuesItemNode>): ValuesNode;
}>;

declare type InsertObject<DB, TB extends keyof DB> = {
    [C in NonNullableInsertKeys<DB[TB]>]: ValueExpression<DB, TB, InsertType<DB[TB][C]>>;
} & {
    [C in NullableInsertKeys<DB[TB]>]?: ValueExpression<DB, TB, InsertType<DB[TB][C]>> | undefined;
};

declare type MutationObject<DB, TB extends keyof DB, TM extends keyof DB> = {
    [C in UpdateKeys<DB[TM]>]?: ValueExpression<DB, TB, UpdateType<DB[TM][C]>> | undefined;
};

declare type ReturningRow<DB, TB extends keyof DB, O, SE> = O extends InsertResult ? Selection<DB, TB, SE> : O extends DeleteResult ? Selection<DB, TB, SE> : O extends UpdateResult ? Selection<DB, TB, SE> : O & Selection<DB, TB, SE>;

interface ReturningInterface<DB, TB extends keyof DB, O> {
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update` and `delete` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirst()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, first_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirst()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning([
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     (qb) => qb.selectFrom('pets').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirst()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): ReturningInterface<DB, TB, ReturningRow<DB, TB, O, SE>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): ReturningInterface<DB, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` to an insert/update/delete query on databases
     * that support `returning` such as PostgreSQL.
     */
    returningAll(): ReturningInterface<DB, TB, Selectable<DB[TB]>>;
}

declare class OnConflictBuilder<DB, TB extends keyof DB> implements WhereInterface<DB, TB> {
    #private;
    constructor(props: OnConflictBuilderProps);
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    column(column: AnyColumn<DB, TB>): OnConflictBuilder<DB, TB>;
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    columns(columns: ReadonlyArray<AnyColumn<DB, TB>>): OnConflictBuilder<DB, TB>;
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    constraint(constraintName: string): OnConflictBuilder<DB, TB>;
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */
    expression(expression: Expression<any>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.where} for more info.
     */
    where<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): OnConflictBuilder<DB, TB>;
    /**
     * Adds a `where` clause to the query.
     *
     * Also see {@link orWhere}, {@link whereExists} and {@link whereRef}.
     *
     * ### Examples
     *
     * Find a row by column value:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 100)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = $1
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use
     *
     * ```ts
     * sql`your operator`
     * ```
     *
     * The next example uses the `>` operator:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '>', 100)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" > $1
     * ```
     *
     * `where` methods don't change the type of the query. You can add
     * conditional statements easily by doing something like this:
     *
     * ```ts
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * This is true for basically all methods execpt the `select` and
     * `returning`, that __do__ change the return type of the query.
     *
     * Both the first and third argument can also be subqueries.
     * A subquery is defined by passing a function and calling
     * the `selectFrom` method of the object passed into the
     * function:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be subqueries or raw
     * {@link sql} expressions.
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * If you only pass one function argument to this method, it can be
     * used to create parentheses around other where statements:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .orWhere(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where(grouper: WhereGrouper<DB, TB>): OnConflictBuilder<DB, TB>;
    where(expression: Expression<any>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.orWhere} for more info.
     */
    orWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): OnConflictBuilder<DB, TB>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link where}.
     *
     * It's often necessary to wrap `or where` clauses in parentheses to control
     * precendence. You can use the one argument version of the `where` method
     * for that. See the examples.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 1)
     *   .orWhere('id', '=', 2)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = 1 or "id" = 2
     * ```
     *
     * Grouping with parentheses:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * Even the first `where` can be an `orWhere`. This is useful
     * if you are looping through a set of conditions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .orWhere('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     */
    orWhere(grouper: WhereGrouper<DB, TB>): OnConflictBuilder<DB, TB>;
    orWhere(expression: Expression<any>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.orWhereRef} for more info.
     */
    orWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.whereExists} for more info.
     */
    whereExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.whereNotExists} for more info.
     */
    whereNotExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.orWhereExists} for more info.
     */
    orWhereExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictBuilder<DB, TB>;
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.orWhereNotExists} for more info.
     */
    orWhereNotExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictBuilder<DB, TB>;
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({ first_name, pic })
     *   .onConflict((oc) => oc
     *     .column('pic')
     *     .doNothing()
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "pic")
     * values ($1, $2)
     * on conflict ("pic") do nothing
     * ```
     */
    doNothing(): OnConflictDoNothingBuilder<DB, TB>;
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({ first_name, pic })
     *   .onConflict((oc) => oc
     *     .column('pic')
     *     .doUpdateSet({ first_name })
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "pic")
     * values ($1, $2)
     * on conflict ("pic")
     * do update set "first_name" = $3
     * ```
     */
    doUpdateSet(updates: MutationObject<OnConflictDatabase<DB, TB>, OnConflictTables<TB>, OnConflictTables<TB>>): OnConflictUpdateBuilder<OnConflictDatabase<DB, TB>, OnConflictTables<TB>>;
}
interface OnConflictBuilderProps {
    readonly onConflictNode: OnConflictNode;
}
declare type OnConflictDatabase<DB, TB extends keyof DB> = {
    [K in keyof DB | 'excluded']: K extends keyof DB ? DB[K] : DB[TB];
};
declare type OnConflictTables<TB> = TB | 'excluded';
declare class OnConflictDoNothingBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: OnConflictBuilderProps);
    toOperationNode(): OnConflictNode;
}
declare class OnConflictUpdateBuilder<DB, TB extends keyof DB> implements WhereInterface<DB, TB>, OperationNodeSource {
    #private;
    constructor(props: OnConflictBuilderProps);
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.where} for more info.
     */
    where<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Adds a `where` clause to the query.
     *
     * Also see {@link orWhere}, {@link whereExists} and {@link whereRef}.
     *
     * ### Examples
     *
     * Find a row by column value:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 100)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = $1
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use
     *
     * ```ts
     * sql`your operator`
     * ```
     *
     * The next example uses the `>` operator:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '>', 100)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" > $1
     * ```
     *
     * `where` methods don't change the type of the query. You can add
     * conditional statements easily by doing something like this:
     *
     * ```ts
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * This is true for basically all methods execpt the `select` and
     * `returning`, that __do__ change the return type of the query.
     *
     * Both the first and third argument can also be subqueries.
     * A subquery is defined by passing a function and calling
     * the `selectFrom` method of the object passed into the
     * function:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be subqueries or raw
     * {@link sql} expressions.
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * If you only pass one function argument to this method, it can be
     * used to create parentheses around other where statements:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .orWhere(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where(grouper: WhereGrouper<DB, TB>): OnConflictUpdateBuilder<DB, TB>;
    where(expression: Expression<any>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.orWhere} for more info.
     */
    orWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link where}.
     *
     * It's often necessary to wrap `or where` clauses in parentheses to control
     * precendence. You can use the one argument version of the `where` method
     * for that. See the examples.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 1)
     *   .orWhere('id', '=', 2)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = 1 or "id" = 2
     * ```
     *
     * Grouping with parentheses:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * Even the first `where` can be an `orWhere`. This is useful
     * if you are looping through a set of conditions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .orWhere('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     */
    orWhere(grouper: WhereGrouper<DB, TB>): OnConflictUpdateBuilder<DB, TB>;
    orWhere(expression: Expression<any>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.orWhereRef} for more info.
     */
    orWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereExists} for more info.
     */
    whereExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereNotExists} for more info.
     */
    whereNotExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.orWhereExists} for more info.
     */
    orWhereExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictUpdateBuilder<DB, TB>;
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.orWhereNotExists} for more info.
     */
    orWhereNotExists(arg: ExpressionOrFactory<DB, TB, any>): OnConflictUpdateBuilder<DB, TB>;
    toOperationNode(): OnConflictNode;
}

declare class InsertQueryBuilder<DB, TB extends keyof DB, O> implements ReturningInterface<DB, TB, O>, OperationNodeSource, Compilable<O>, Explainable {
    #private;
    constructor(props: InsertQueryBuilderProps);
    /**
     * Sets the values to insert for an {@link Kysely.insertInto | insert} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to insert. In addition to the column's type, the values can be
     * raw {@link sql} snippets or select queries.
     *
     * You must provide all fields you haven't explicitly marked as nullable
     * or optional using {@link Generated} or {@link ColumnType}.
     *
     * The return value of an `insert` query is an instance of {@link InsertResult}. The
     * {@link InsertResult.insertId | insertId} field holds the auto incremented primary
     * key if the database returned one.
     *
     * On PostgreSQL and some other dialects, you need to call `returning` to get
     * something out of the query.
     *
     * Also see the {@link expression} method for inserting the result of a select
     * query or any other expression.
     *
     * ### Examples
     *
     * Insert a row into `person`:
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name") values ($1, $2)
     * ```
     *
     * On dialects that support it (for example PostgreSQL) you can insert multiple
     * rows by providing an array. Note that the return value is once again very
     * dialect-specific. Some databases may only return the id of the *last* inserted
     * row and some return nothing at all unless you call `returning`.
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values([{
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   }, {
     *     first_name: 'Arnold',
     *     last_name: 'Schwarzenegger',
     *   }])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name") values (($1, $2), ($3, $4))
     * ```
     *
     * On PostgreSQL you need to chain `returning` to the query to get
     * the inserted row's columns (or any other expression) as the
     * return value:
     *
     * ```ts
     * const row = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     *
     * row.id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name") values ($1, $2) returning "id"
     * ```
     *
     * In addition to primitives, the values can also be raw sql expressions or
     * select queries:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: sql`${'Ani'} || ${'ston'}`,
     *     age: db.selectFrom('person').select(sql`avg(age)`),
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "last_name", "age")
     * values ($1, $2 || $3, (select avg(age) from "person"))
     * ```
     *
     * You can also use the callback version of subqueries or raw expressions:
     *
     * ```ts
     * db.with('jennifer', (db) => db
     *   .selectFrom('person')
     *   .where('first_name', '=', 'Jennifer')
     *   .select(['id', 'first_name', 'gender'])
     *   .limit(1)
     * ).insertInto('pet').values({
     *   owner_id: (eb) => eb.selectFrom('jennifer').select('id'),
     *   name: (eb) => eb.selectFrom('jennifer').select('first_name'),
     *   species: 'cat',
     * })
     * ```
     */
    values(row: InsertObject<DB, TB>): InsertQueryBuilder<DB, TB, O>;
    values(row: ReadonlyArray<InsertObject<DB, TB>>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Sets the columns to insert.
     *
     * The {@link values} method sets both the columns and the values and this method
     * is not needed. But if you are using the {@link expression} method, you can use
     * this method to set the columns to insert.
     *
     * ### Examples
     *
     * ```ts
     * db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    columns(columns: ReadonlyArray<keyof DB[TB] & string>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Insert an arbitrary expression. For example the result of a select query.
     *
     * ### Examples
     *
     * ```ts
     * db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    expression(expression: ExpressionOrFactory<DB, TB, any>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Changes an `insert into` query to an `insert ignore into` query.
     *
     * If you use the ignore modifier, ignorable errors that occur while executing the
     * insert statement are ignored. For example, without ignore, a row that duplicates
     * an existing unique index or primary key value in the table causes a duplicate-key
     * error and the statement is aborted. With ignore, the row is discarded and no error
     * occurs.
     *
     * This is only supported on some dialects like MySQL. On most dialects you should
     * use the {@link onConflict} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .ignore()
     *   .values(values)
     *   .execute()
     * ```
     */
    ignore(): InsertQueryBuilder<DB, TB, O>;
    /**
     * Adds an `on conflict` clause to the query.
     *
     * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
     * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict ("name")
     * do update set "species" = $3
     * ```
     *
     * You can provide the name of the constraint instead of a column name:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .constraint('pet_name_key')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict on constraint "pet_name_key"
     * do update set "species" = $3
     * ```
     *
     * You can also specify an expression as the conflict target in case
     * the unique index is an expression index:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .expression(sql`lower(name)`)
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict (lower(name))
     * do update set "species" = $3
     * ```
     *
     * You can add a filter for the update statement like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *     .where('excluded.name', '!=', 'Catto'')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict ("name")
     * do update set "species" = $3
     * where "excluded"."name" != $4
     * ```
     *
     * You can create an `on conflict do nothing` clauses like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict ("name") do nothing
     * ```
     *
     * You can refer to the columns of the virtual `excluded` table
     * in a type-safe way using a callback and the `ref` method of
     * `ExpressionBuilder`:
     *
     * ```ts
     * db.insertInto('person')
     *   .values(person)
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     * ```
     */
    onConflict(callback: (builder: OnConflictBuilder<DB, TB>) => OnConflictDoNothingBuilder<DB, TB> | OnConflictUpdateBuilder<DB, TB>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Adds `on duplicate key update` to the query.
     *
     * If you specify `on duplicate key update`, and a row is inserted that would cause
     * a duplicate value in a unique index or primary key, an update of the old row occurs.
     *
     * This is only implemented by some dialects like MySQL. On most dialects you should
     * use {@link onConflict} instead.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values(values)
     *   .onDuplicateKeyUpdate({ species: 'hamster' })
     * ```
     */
    onDuplicateKeyUpdate(updates: MutationObject<DB, TB, TB>): InsertQueryBuilder<DB, TB, O>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update` and `delete` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirst()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, first_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirst()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning([
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     (qb) => qb.selectFrom('pets').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirst()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): InsertQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` to an insert/update/delete query on databases
     * that support `returning` such as PostgreSQL.
     */
    returningAll(): InsertQueryBuilder<DB, TB, Selectable<DB[TB]>>;
    /**
     * Simply calls the given function passing `this` as the only argument.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link if} method.
     *
     * ### Examples
     *
     * The next example uses a helper funtion `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.updateTable('person')
     *   .set(values)
     *   .call(log)
     *   .execute()
     * ```
     */
    call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function insertPerson(values: InsertablePerson, returnLastName: boolean) {
     *   return await db
     *     .insertInto('person')
     *     .values(values)
     *     .returning(['id', 'first_name'])
     *     .if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `insertPerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     */
    if<O2>(condition: boolean, func: (qb: this) => InsertQueryBuilder<DB, TB, O2>): InsertQueryBuilder<DB, TB, O2 extends InsertResult ? InsertResult : O extends InsertResult ? Partial<O2> : MergePartial<O, O2>>;
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    castTo<T>(): InsertQueryBuilder<DB, TB, T>;
    /**
     * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): InsertQueryBuilder<DB, TB, O>;
    toOperationNode(): InsertQueryNode;
    compile(): CompiledQuery<O>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<O[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SingleResultType<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor): Promise<O>;
    /**
     * Executes query with `explain` statement before `insert` keyword.
     *
     * ```ts
     * const explained = await db
     *  .insertInto('person')
     *  .values(values)
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json insert into `person` (`id`, `first_name`, `last_name`) values (?, ?, ?) (?, ?, ?)
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface InsertQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: InsertQueryNode;
    readonly executor: QueryExecutor;
}

declare class DeleteQueryBuilder<DB, TB extends keyof DB, O> implements WhereInterface<DB, TB>, ReturningInterface<DB, TB, O>, OperationNodeSource, Compilable<O>, Explainable {
    #private;
    constructor(props: DeleteQueryBuilderProps);
    /**
     * Adds a `where` clause to the query.
     *
     * Also see {@link orWhere}, {@link whereExists} and {@link whereRef}.
     *
     * ### Examples
     *
     * Find a row by column value:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 100)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = $1
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use
     *
     * ```ts
     * sql`your operator`
     * ```
     *
     * The next example uses the `>` operator:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '>', 100)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" > $1
     * ```
     *
     * `where` methods don't change the type of the query. You can add
     * conditional statements easily by doing something like this:
     *
     * ```ts
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * This is true for basically all methods execpt the `select` and
     * `returning`, that __do__ change the return type of the query.
     *
     * Both the first and third argument can also be subqueries.
     * A subquery is defined by passing a function and calling
     * the `selectFrom` method of the object passed into the
     * function:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be subqueries or raw
     * {@link sql} expressions.
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * If you only pass one function argument to this method, it can be
     * used to create parentheses around other where statements:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .orWhere(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): DeleteQueryBuilder<DB, TB, O>;
    where(grouper: WhereGrouper<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    where(expression: Expression<any>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((qb) => qb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link where}.
     *
     * It's often necessary to wrap `or where` clauses in parentheses to control
     * precendence. You can use the one argument version of the `where` method
     * for that. See the examples.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 1)
     *   .orWhere('id', '=', 2)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = 1 or "id" = 2
     * ```
     *
     * Grouping with parentheses:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * Even the first `where` can be an `orWhere`. This is useful
     * if you are looping through a set of conditions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .orWhere('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     */
    orWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): DeleteQueryBuilder<DB, TB, O>;
    orWhere(grouper: WhereGrouper<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    orWhere(expression: Expression<any>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link whereRef}.
     *
     * Also see {@link orWhere} and {@link where}.
     */
    orWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds a `where exists` clause to the query.
     *
     * You can either use a subquery or a raw {@link sql} snippet.
     *
     * ### Examples
     *
     * The query below selets all persons that own a pet named Catto:
     *
     * ```ts
     * const petName = 'Catto'
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .whereExists((qb) => qb
     *     .selectFrom('pet')
     *     .select('pet.id')
     *     .whereRef('person.id', '=', 'pet.owner_id')
     *     .where('pet.name', '=', petName)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select "pet"."id"
     *   from "pet"
     *   where "person"."id" = "pet"."owner_id"
     *   and "pet"."name" = $1
     * )
     * ```
     *
     * The same query as in the previous example but with using raw {@link sql}:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const petName = 'Catto'
     * db.selectFrom('person')
     *   .selectAll()
     *   .whereExists(
     *     sql`(select pet.id from pet where person.id = pet.owner_id and pet.name = ${petName})`
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select pet.id
     *   from pet
     *   where person.id = pet.owner_id
     *   and pet.name = $1
     * )
     * ```
     */
    whereExists(arg: ExistsExpression<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link whereExists} but creates a `not exists` clause.
     */
    whereNotExists(arg: ExistsExpression<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link whereExists} but creates an `or exists` clause.
     */
    orWhereExists(arg: ExistsExpression<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Just like {@link whereExists} but creates an `or not exists` clause.
     */
    orWhereNotExists(arg: ExistsExpression<DB, TB>): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Joins another table to the query using an inner join.
     *
     * ### Examples
     *
     * Simple usage by providing a table name and two columns to join:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   // `select` needs to come after the call to `innerJoin` so
     *   // that you can select from the joined table.
     *   .select('person.id', 'pet.name')
     *   .execute()
     *
     * result[0].id
     * result[0].name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "pet"."name"
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * ```
     *
     * You can give an alias for the joined table like this:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet as p', 'p.owner_id', 'person.id')
     *   .where('p.name', '=', 'Doggo')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet" as "p"
     * on "p"."owner_id" = "person"."id"
     * where "p".name" = $1
     * ```
     *
     * You can provide a function as the second argument to get a join
     * builder for creating more complex joins. The join builder has a
     * bunch of `on*` methods for building the `on` clause of the join.
     * There's basically an equivalent for every `where` method
     * (`on`, `onRef`, `onExists` etc.). You can do all the same things
     * with the `on` method that you can with the corresponding `where`
     * method. See the `where` method documentation for more examples.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     'pet',
     *     (join) => join
     *       .onRef('pet.owner_id', '=', 'person.id')
     *       .on('pet.name', '=', 'Doggo')
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * and "pet"."name" = $1
     * ```
     *
     * You can join a subquery by providing a select query (or a callback)
     * as the first argument:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     qb.selectFrom('pet')
     *       .select(['owner_id', 'name'])
     *       .where('name', '=', 'Doggo')
     *       .as('doggos'),
     *     'doggos.owner_id',
     *     'person.id',
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join (
     *   select "owner_id", "name"
     *   from "pet"
     *   where "name" = $1
     * ) as "doggos"
     * on "doggos"."owner_id" = "person"."id"
     * ```
     */
    innerJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    innerJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithInnerJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a left join instead of an inner join.
     */
    leftJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    leftJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithLeftJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a right join instead of an inner join.
     */
    rightJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithRightJoin<DB, TB, O, TE>;
    rightJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithRightJoin<DB, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a full join instead of an inner join.
     */
    fullJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): DeleteQueryBuilderWithFullJoin<DB, TB, O, TE>;
    fullJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): DeleteQueryBuilderWithFullJoin<DB, TB, O, TE>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update` and `delete` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirst()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, first_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirst()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning([
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     (qb) => qb.selectFrom('pets').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirst()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): DeleteQueryBuilder<DB, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` to an insert/update/delete query on databases
     * that support `returning` such as PostgreSQL.
     */
    returningAll(): DeleteQueryBuilder<DB, TB, Selectable<DB[TB]>>;
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
     * multiple times.
     *
     * The first argument is the expression to order by and the second is the
     * order (`asc` or `desc`).
     *
     * An `order by` clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * See {@link SelectQueryBuilder.orderBy} for more examples.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet`
     * order by `created_at`
     * limit ?
     * ```
     */
    orderBy(orderBy: OrderByExpression<DB, TB, O>, direction?: OrderByDirectionExpression): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Adds a limit clause to the query.
     *
     * A limit clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     */
    limit(limit: number): DeleteQueryBuilder<DB, TB, O>;
    /**
     * Simply calls the given function passing `this` as the only argument.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link if} method.
     *
     * ### Examples
     *
     * The next example uses a helper funtion `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.deleteFrom('person')
     *   .call(log)
     *   .execute()
     * ```
     */
    call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function deletePerson(id: number, returnLastName: boolean) {
     *   return await db
     *     .deleteFrom('person')
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `deletePerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     */
    if<O2>(condition: boolean, func: (qb: this) => DeleteQueryBuilder<DB, TB, O2>): DeleteQueryBuilder<DB, TB, O2 extends DeleteResult ? DeleteResult : O extends DeleteResult ? Partial<O2> : MergePartial<O, O2>>;
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    castTo<T>(): DeleteQueryBuilder<DB, TB, T>;
    /**
     * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): DeleteQueryBuilder<DB, TB, O>;
    toOperationNode(): DeleteQueryNode;
    compile(): CompiledQuery<O>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<O[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SingleResultType<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor): Promise<O>;
    /**
     * Executes query with `explain` statement before `delete` keyword.
     *
     * ```ts
     * const explained = await db
     *  .deleteFrom('person')
     *  .where('id', '=', 123)
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json delete from `person` where `id` = ?
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface DeleteQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: DeleteQueryNode;
    readonly executor: QueryExecutor;
}
declare type DeleteQueryBuilderWithInnerJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? InnerJoinedBuilder$1<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? DeleteQueryBuilder<DB, TB | TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$1<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder$1<DB, TB, O, QA, QO> : never;
declare type InnerJoinedBuilder$1<DB, TB extends keyof DB, O, A extends string, R> = A extends keyof DB ? DeleteQueryBuilder<InnerJoinedDB$1<DB, A, R>, TB | A, O> : DeleteQueryBuilder<DB & Record<A, R>, TB | A, O>;
declare type InnerJoinedDB$1<DB, A extends string, R> = {
    [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never;
};
declare type DeleteQueryBuilderWithLeftJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? LeftJoinedBuilder$1<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? LeftJoinedBuilder$1<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$1<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder$1<DB, TB, O, QA, QO> : never;
declare type LeftJoinedBuilder$1<DB, TB extends keyof DB, O, A extends keyof any, R> = A extends keyof DB ? DeleteQueryBuilder<LeftJoinedDB$1<DB, A, R>, TB | A, O> : DeleteQueryBuilder<DB & Record<A, Nullable<R>>, TB | A, O>;
declare type LeftJoinedDB$1<DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends keyof DB ? DB[C] : never;
};
declare type DeleteQueryBuilderWithRightJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? RightJoinedBuilder$1<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? RightJoinedBuilder$1<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$1<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder$1<DB, TB, O, QA, QO> : never;
declare type RightJoinedBuilder$1<DB, TB extends keyof DB, O, A extends keyof any, R> = DeleteQueryBuilder<RightJoinedDB$1<DB, TB, A, R>, TB | A, O>;
declare type RightJoinedDB$1<DB, TB extends keyof DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? R : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
};
declare type DeleteQueryBuilderWithFullJoin<DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? OuterJoinedBuilder$1<DB, TB, O, A, DB[T]> : never : TE extends keyof DB ? OuterJoinedBuilder$1<DB, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$1<DB, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder$1<DB, TB, O, QA, QO> : never;
declare type OuterJoinedBuilder$1<DB, TB extends keyof DB, O, A extends keyof any, R> = DeleteQueryBuilder<OuterJoinedBuilderDB$1<DB, TB, A, R>, TB | A, O>;
declare type OuterJoinedBuilderDB$1<DB, TB extends keyof DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
};

declare class UpdateQueryBuilder<DB, UT extends keyof DB, TB extends keyof DB, O> implements WhereInterface<DB, TB>, ReturningInterface<DB, TB, O>, OperationNodeSource, Compilable<O>, Explainable {
    #private;
    constructor(props: UpdateQueryBuilderProps);
    /**
     * Adds a `where` clause to the query.
     *
     * Also see {@link orWhere}, {@link whereExists} and {@link whereRef}.
     *
     * ### Examples
     *
     * Find a row by column value:
     *
     * ```ts
     * const person = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 100)
     *   .executeTakeFirst()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = $1
     * ```
     *
     * Operator can be any supported operator or if the typings don't support it
     * you can always use
     *
     * ```ts
     * sql`your operator`
     * ```
     *
     * The next example uses the `>` operator:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '>', 100)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" > $1
     * ```
     *
     * `where` methods don't change the type of the query. You can add
     * conditional statements easily by doing something like this:
     *
     * ```ts
     * let query = db
     *   .selectFrom('person')
     *   .selectAll()
     *
     * if (firstName) {
     *   // The query builder is immutable. Remember to reassign
     *   // the result back to the query variable.
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * const persons = await query.execute()
     * ```
     *
     * This is true for basically all methods execpt the `select` and
     * `returning`, that __do__ change the return type of the query.
     *
     * Both the first and third argument can also be subqueries.
     * A subquery is defined by passing a function and calling
     * the `selectFrom` method of the object passed into the
     * function:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     (qb) => qb.selectFrom('pet')
     *       .select('pet.name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .limit(1),
     *     '=',
     *     'Fluffy'
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * where (
     *   select "pet"."name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) = $2
     * ```
     *
     * A `where in` query can be built by using the `in` operator and an array
     * of values. The values in the array can also be subqueries or raw
     * {@link sql} expressions.
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('person.id', 'in', [100, 200, 300])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" in ($1, $2, $3)
     * ```
     *
     * If everything else fails, you can always use the {@link sql} tag
     * as any of the arguments, including the operator:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(
     *     sql`coalesce(first_name, last_name)`,
     *     'like',
     *     '%' + name + '%',
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where coalesce(first_name, last_name) like $1
     * ```
     *
     * If you only pass one function argument to this method, it can be
     * used to create parentheses around other where statements:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * In all examples above the columns were known at compile time
     * (except for the raw {@link sql} expressions). By default kysely only
     * allows you to refer to columns that exist in the database **and**
     * can be referred to in the current query and context.
     *
     * Sometimes you may want to refer to columns that come from the user
     * input and thus are not available at compile time.
     *
     * You have two options, the {@link sql} tag or `db.dynamic`. The example below
     * uses both:
     *
     * ```ts
     * import { sql } from 'kysely'
     * const { ref } = db.dynamic
     *
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where(ref(columnFromUserInput), '=', 1)
     *   .orWhere(sql.id(columnFromUserInput), '=', 2)
     *   .execute()
     * ```
     */
    where<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): UpdateQueryBuilder<DB, UT, TB, O>;
    where(grouper: WhereGrouper<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    where(expression: Expression<any>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds a `where` clause where both sides of the operator are references
     * to columns.
     *
     * The normal `where` method treats the right hand side argument as a
     * value by default. `whereRef` treats it as a column reference. This method is
     * expecially useful with joins and correlated subqueries.
     *
     * ### Examples
     *
     * Usage with a join:
     *
     * ```ts
     * db.selectFrom(['person', 'pet'])
     *   .selectAll()
     *   .whereRef('person.first_name', '=', 'pet.name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person", "pet" where "person"."first_name" = "pet"."name"
     * ```
     *
     * Usage in a subquery:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll('person')
     *   .select((qb) => qb
     *     .selectFrom('pet')
     *     .select('name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *     .as('pet_name')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person".*, (
     *   select "name"
     *   from "pet"
     *   where "pet"."owner_id" = "person"."id"
     *   limit $1
     * ) as "pet_name"
     * from "person"
     */
    whereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link where}.
     *
     * It's often necessary to wrap `or where` clauses in parentheses to control
     * precendence. You can use the one argument version of the `where` method
     * for that. See the examples.
     *
     * ### Examples
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where('id', '=', 1)
     *   .orWhere('id', '=', 2)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" where "id" = 1 or "id" = 2
     * ```
     *
     * Grouping with parentheses:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .where('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     *
     * Even the first `where` can be an `orWhere`. This is useful
     * if you are looping through a set of conditions:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .where((qb) => qb
     *     .orWhere('id', '=', 1)
     *     .orWhere('id', '=', 2)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person" (where "id" = 1 or "id" = 2)
     * ```
     */
    orWhere<RE extends ReferenceExpression<DB, TB>>(lhs: RE, op: ComparisonOperatorExpression, rhs: OperandValueExpressionOrList<DB, TB, RE>): UpdateQueryBuilder<DB, UT, TB, O>;
    orWhere(grouper: WhereGrouper<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    orWhere(expression: Expression<any>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds an `or where` clause to the query. Otherwise works just like {@link whereRef}.
     *
     * Also see {@link orWhere} and {@link where}.
     */
    orWhereRef(lhs: ReferenceExpression<DB, TB>, op: ComparisonOperatorExpression, rhs: ReferenceExpression<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds a `where exists` clause to the query.
     *
     * You can either use a subquery or a raw {@link sql} snippet.
     *
     * ### Examples
     *
     * The query below selets all persons that own a pet named Catto:
     *
     * ```ts
     * const petName = 'Catto'
     * const persons = await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .whereExists((qb) => qb
     *     .selectFrom('pet')
     *     .select('pet.id')
     *     .whereRef('person.id', '=', 'pet.owner_id')
     *     .where('pet.name', '=', petName)
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select "pet"."id"
     *   from "pet"
     *   where "person"."id" = "pet"."owner_id"
     *   and "pet"."name" = $1
     * )
     * ```
     *
     * The same query as in the previous example but with using raw {@link sql}:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const petName = 'Catto'
     * db.selectFrom('person')
     *   .selectAll()
     *   .whereExists(
     *     sql`(select pet.id from pet where person.id = pet.owner_id and pet.name = ${petName})`
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where exists (
     *   select pet.id
     *   from pet
     *   where person.id = pet.owner_id
     *   and pet.name = $1
     * )
     * ```
     */
    whereExists(arg: ExistsExpression<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Just like {@link whereExists} but creates a `not exists` clause.
     */
    whereNotExists(arg: ExistsExpression<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Just like {@link whereExists} but creates an `or exists` clause.
     */
    orWhereExists(arg: ExistsExpression<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Just like {@link whereExists} but creates an `or not exists` clause.
     */
    orWhereNotExists(arg: ExistsExpression<DB, TB>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Adds a from clause to the update query.
     *
     * This is supported only on some databases like PostgreSQL.
     *
     * The API is the same as {@link QueryCreator.selectFrom}.
     *
     * ### Examples
     *
     * ```ts
     * db.updateTable('person')
     *   .from('pet')
     *   .set({
     *     first_name: (eb) => eb.ref('pet.name')
     *   })
     *   .whereRef('pet.owner_id', '=', 'person.id')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person"
     * set "first_name" = "pet"."name"
     * from "pet"
     * where "pet"."owner_id" = "person"."id"
     * ```
     */
    from<TE extends TableExpression<DB, TB>>(table: TE): UpdateQueryBuilder<From<DB, TE>, UT, FromTables<DB, TB, TE>, O>;
    from<TE extends TableExpression<DB, TB>>(table: TE[]): UpdateQueryBuilder<From<DB, TE>, UT, FromTables<DB, TB, TE>, O>;
    /**
     * Joins another table to the query using an inner join.
     *
     * ### Examples
     *
     * Simple usage by providing a table name and two columns to join:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   // `select` needs to come after the call to `innerJoin` so
     *   // that you can select from the joined table.
     *   .select('person.id', 'pet.name')
     *   .execute()
     *
     * result[0].id
     * result[0].name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "pet"."name"
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * ```
     *
     * You can give an alias for the joined table like this:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin('pet as p', 'p.owner_id', 'person.id')
     *   .where('p.name', '=', 'Doggo')
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet" as "p"
     * on "p"."owner_id" = "person"."id"
     * where "p".name" = $1
     * ```
     *
     * You can provide a function as the second argument to get a join
     * builder for creating more complex joins. The join builder has a
     * bunch of `on*` methods for building the `on` clause of the join.
     * There's basically an equivalent for every `where` method
     * (`on`, `onRef`, `onExists` etc.). You can do all the same things
     * with the `on` method that you can with the corresponding `where`
     * method. See the `where` method documentation for more examples.
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     'pet',
     *     (join) => join
     *       .onRef('pet.owner_id', '=', 'person.id')
     *       .on('pet.name', '=', 'Doggo')
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join "pet"
     * on "pet"."owner_id" = "person"."id"
     * and "pet"."name" = $1
     * ```
     *
     * You can join a subquery by providing a select query (or a callback)
     * as the first argument:
     *
     * ```ts
     * await db.selectFrom('person')
     *   .innerJoin(
     *     qb.selectFrom('pet')
     *       .select(['owner_id', 'name'])
     *       .where('name', '=', 'Doggo')
     *       .as('doggos'),
     *     'doggos.owner_id',
     *     'person.id',
     *   )
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * inner join (
     *   select "owner_id", "name"
     *   from "pet"
     *   where "name" = $1
     * ) as "doggos"
     * on "doggos"."owner_id" = "person"."id"
     * ```
     */
    innerJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithInnerJoin<DB, UT, TB, O, TE>;
    innerJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithInnerJoin<DB, UT, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a left join instead of an inner join.
     */
    leftJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithLeftJoin<DB, UT, TB, O, TE>;
    leftJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithLeftJoin<DB, UT, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a right join instead of an inner join.
     */
    rightJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithRightJoin<DB, UT, TB, O, TE>;
    rightJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithRightJoin<DB, UT, TB, O, TE>;
    /**
     * Just like {@link innerJoin} but adds a full join instead of an inner join.
     */
    fullJoin<TE extends TableExpression<DB, TB>, K1 extends JoinReferenceExpression<DB, TB, TE>, K2 extends JoinReferenceExpression<DB, TB, TE>>(table: TE, k1: K1, k2: K2): UpdateQueryBuilderWithFullJoin<DB, UT, TB, O, TE>;
    fullJoin<TE extends TableExpression<DB, TB>, FN extends JoinCallbackExpression<DB, TB, TE>>(table: TE, callback: FN): UpdateQueryBuilderWithFullJoin<DB, UT, TB, O, TE>;
    /**
     * Sets the values to update for an {@link Kysely.updateTable | update} query.
     *
     * This method takes an object whose keys are column names and values are
     * values to update. In addition to the column's type, the values can be
     * raw {@link sql} snippets or select queries.
     *
     * The return value of an update query is an instance of {@link UpdateResult}.
     * You can use the {@link returning} method on supported databases to get out
     * the updated rows.
     *
     * ### Examples
     *
     * Update a row in `person` table:
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .where('id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person" set "first_name" = $1, "last_name" = $2 where "id" = $3
     * ```
     *
     * On PostgreSQL you ca chain `returning` to the query to get
     * the updated rows' columns (or any other expression) as the
     * return value:
     *
     * ```ts
     * const row = await db
     *   .updateTable('person')
     *   .set({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .where('id', '=', 1)
     *   .returning('id')
     *   .executeTakeFirstOrThrow()
     *
     * row.id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person" set "first_name" = $1, "last_name" = $2 where "id" = $3 returning "id"
     * ```
     *
     * In addition to primitives, the values can also be raw sql expressions or
     * select queries:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const result = await db
     *   .updateTable('person')
     *   .set({
     *     first_name: 'Jennifer',
     *     last_name: sql`${'Ani'} || ${'ston'}`,
     *     age: db.selectFrom('person').select(sql`avg(age)`),
     *   })
     *   .where('id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * update "person" set
     * "first_name" = $1,
     * "last_name" = $2 || $3,
     * "age" = (select avg(age) from "person")
     * where "id" = $4
     * ```
     */
    set(row: MutationObject<DB, TB, UT>): UpdateQueryBuilder<DB, UT, TB, O>;
    /**
     * Allows you to return data from modified rows.
     *
     * On supported databases like PostgreSQL, this method can be chained to
     * `insert`, `update` and `delete` queries to return data.
     *
     * Note that on SQLite you need to give aliases for the expressions to avoid
     * [this bug](https://sqlite.org/forum/forumpost/033daf0b32) in SQLite.
     * For example `.returning('id as id')`.
     *
     * Also see the {@link returningAll} method.
     *
     * ### Examples
     *
     * Return one column:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirst()
     * ```
     *
     * Return multiple columns:
     *
     * ```ts
     * const { id, first_name } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning(['id', 'last_name'])
     *   .executeTakeFirst()
     * ```
     *
     * Return arbitrary expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const { id, full_name, first_pet_id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning([
     *     'id as id',
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name'),
     *     (qb) => qb.selectFrom('pets').select('pet.id').limit(1).as('first_pet_id')
     *   ])
     *   .executeTakeFirst()
     * ```
     */
    returning<SE extends SelectExpression<DB, TB>>(selections: ReadonlyArray<SE>): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SE>>;
    returning<SE extends SelectExpression<DB, TB>>(selection: SE): UpdateQueryBuilder<DB, UT, TB, ReturningRow<DB, TB, O, SE>>;
    /**
     * Adds a `returning *` to an insert/update/delete query on databases
     * that support `returning` such as PostgreSQL.
     */
    returningAll(): UpdateQueryBuilder<DB, UT, TB, Selectable<DB[TB]>>;
    /**
     * Simply calls the given function passing `this` as the only argument.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link if} method.
     *
     * ### Examples
     *
     * The next example uses a helper funtion `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.updateTable('person')
     *   .set(values)
     *   .call(log)
     *   .execute()
     * ```
     */
    call<T>(func: (qb: this) => T): T;
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function updatePerson(id: number, updates: UpdateablePerson, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     */
    if<O2>(condition: boolean, func: (qb: this) => UpdateQueryBuilder<DB, UT, TB, O2>): UpdateQueryBuilder<DB, UT, TB, O2 extends UpdateResult ? UpdateResult : O extends UpdateResult ? Partial<O2> : MergePartial<O, O2>>;
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    castTo<T>(): UpdateQueryBuilder<DB, UT, TB, T>;
    /**
     * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): UpdateQueryBuilder<DB, UT, TB, O>;
    toOperationNode(): UpdateQueryNode;
    compile(): CompiledQuery<O>;
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    execute(): Promise<O[]>;
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    executeTakeFirst(): Promise<SingleResultType<O>>;
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class as the only argument to throw a different
     * error.
     */
    executeTakeFirstOrThrow(errorConstructor?: NoResultErrorConstructor): Promise<O>;
    /**
     * Executes query with `explain` statement before `update` keyword.
     *
     * ```ts
     * const explained = await db
     *  .updateTable('person')
     *  .set(updates)
     *  .where('id', '=', 123)
     *  .explain('json')
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * explain format=json update `person` set `first_name` = ?, `last_name` = ? where `id` = ?
     * ```
     */
    explain<ER extends Record<string, any> = Record<string, any>>(format?: ExplainFormat, options?: Expression<any>): Promise<ER[]>;
}
interface UpdateQueryBuilderProps {
    readonly queryId: QueryId;
    readonly queryNode: UpdateQueryNode;
    readonly executor: QueryExecutor;
}
declare type UpdateQueryBuilderWithInnerJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? InnerJoinedBuilder<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? UpdateQueryBuilder<DB, UT, TB | TE, O> : TE extends AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? InnerJoinedBuilder<DB, UT, TB, O, QA, QO> : never;
declare type InnerJoinedBuilder<DB, UT extends keyof DB, TB extends keyof DB, O, A extends string, R> = A extends keyof DB ? UpdateQueryBuilder<InnerJoinedDB<DB, A, R>, UT, TB | A, O> : UpdateQueryBuilder<DB & Record<A, R>, UT, TB | A, O>;
declare type InnerJoinedDB<DB, A extends string, R> = {
    [C in keyof DB | A]: C extends A ? R : C extends keyof DB ? DB[C] : never;
};
declare type UpdateQueryBuilderWithLeftJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? LeftJoinedBuilder<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? LeftJoinedBuilder<DB, UT, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? LeftJoinedBuilder<DB, UT, TB, O, QA, QO> : never;
declare type LeftJoinedBuilder<DB, UT extends keyof DB, TB extends keyof DB, O, A extends keyof any, R> = A extends keyof DB ? UpdateQueryBuilder<LeftJoinedDB<DB, A, R>, UT, TB | A, O> : UpdateQueryBuilder<DB & Record<A, Nullable<R>>, UT, TB | A, O>;
declare type LeftJoinedDB<DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends keyof DB ? DB[C] : never;
};
declare type UpdateQueryBuilderWithRightJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? RightJoinedBuilder<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? RightJoinedBuilder<DB, UT, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? RightJoinedBuilder<DB, UT, TB, O, QA, QO> : never;
declare type RightJoinedBuilder<DB, UT extends keyof DB, TB extends keyof DB, O, A extends keyof any, R> = UpdateQueryBuilder<RightJoinedDB<DB, TB, A, R>, UT, TB | A, O>;
declare type RightJoinedDB<DB, TB extends keyof DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? R : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
};
declare type UpdateQueryBuilderWithFullJoin<DB, UT extends keyof DB, TB extends keyof DB, O, TE extends TableExpression<DB, TB>> = TE extends `${infer T} as ${infer A}` ? T extends keyof DB ? OuterJoinedBuilder<DB, UT, TB, O, A, DB[T]> : never : TE extends keyof DB ? OuterJoinedBuilder<DB, UT, TB, O, TE, DB[TE]> : TE extends AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder<DB, UT, TB, O, QA, QO> : TE extends (qb: any) => AliasedExpression<infer QO, infer QA> ? OuterJoinedBuilder<DB, UT, TB, O, QA, QO> : never;
declare type OuterJoinedBuilder<DB, UT extends keyof DB, TB extends keyof DB, O, A extends keyof any, R> = UpdateQueryBuilder<OuterJoinedBuilderDB<DB, TB, A, R>, UT, TB | A, O>;
declare type OuterJoinedBuilderDB<DB, TB extends keyof DB, A extends keyof any, R> = {
    [C in keyof DB | A]: C extends A ? Nullable<R> : C extends TB ? Nullable<DB[C]> : C extends keyof DB ? DB[C] : never;
};

declare type CommonTableExpression<DB, CN extends string> = (creator: QueryCreator<DB>) => CommonTableExpressionOutput<DB, CN>;
declare type RecursiveCommonTableExpression<DB, CN extends string> = (creator: QueryCreator<DB & Record<ExtractTableFromCommonTableExpressionName<CN>, ExtractRowFromCommonTableExpressionName<CN>>>) => CommonTableExpressionOutput<DB, CN>;
declare type QueryCreatorWithCommonTableExpression<DB, CN extends string, CTE> = QueryCreator<DB & Record<ExtractTableFromCommonTableExpressionName<CN>, ExtractRowFromCommonTableExpression<CTE>>>;
declare type CommonTableExpressionOutput<DB, CN extends string> = Expression<ExtractRowFromCommonTableExpressionName<CN>> | InsertQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>> | UpdateQueryBuilder<DB, any, any, ExtractRowFromCommonTableExpressionName<CN>> | DeleteQueryBuilder<DB, any, ExtractRowFromCommonTableExpressionName<CN>>;
/**
 * Given a common CommonTableExpression CTE extracts the row type from it.
 *
 * For example a CTE `(db) => db.selectFrom('person').select(['id', 'first_name'])`
 * would result in `Pick<Person, 'id' | 'first_name'>`.
 */
declare type ExtractRowFromCommonTableExpression<CTE> = CTE extends (creator: QueryCreator<any>) => infer Q ? Q extends Expression<infer QO> ? QO : Q extends InsertQueryBuilder<any, any, infer QO> ? QO : Q extends UpdateQueryBuilder<any, any, any, infer QO> ? QO : Q extends DeleteQueryBuilder<any, any, infer QO> ? QO : never : never;
/**
 * Extracts 'person' from a string like 'person(id, first_name)'.
 */
declare type ExtractTableFromCommonTableExpressionName<CN extends string> = CN extends `${infer TB}(${string})` ? TB : CN;
/**
 * Parses a string like 'person(id, first_name)' into a type:
 *
 * {
 *   id: any,
 *   first_name: any
 * }
 *
 */
declare type ExtractRowFromCommonTableExpressionName<CN extends string> = CN extends `${string}(${infer CL})` ? {
    [C in ExtractColumnNamesFromColumnList<CL>]: any;
} : Record<string, any>;
/**
 * Parses a string like 'id, first_name' into a type 'id' | 'first_name'
 */
declare type ExtractColumnNamesFromColumnList<R extends string> = R extends `${infer C}, ${infer RS}` ? C | ExtractColumnNamesFromColumnList<RS> : R;

declare class QueryCreator<DB> {
    #private;
    constructor(props: QueryCreatorProps);
    /**
     * Creates a `select` query builder for the given table or tables.
     *
     * The tables passed to this method are built as the query's `from` clause.
     *
     * ### Examples
     *
     * Create a select query for one table:
     *
     * ```ts
     * db.selectFrom('person').selectAll()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     *
     * Create a select query for one table with an alias:
     *
     * ```ts
     * const persons = await db.selectFrom('person as p')
     *   .select(['p.id', 'first_name'])
     *   .execute()
     *
     * console.log(persons[0].id)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."id", "first_name" from "person" as "p"
     * ```
     *
     * Create a select query from a subquery:
     *
     * ```ts
     * const persons = await db.selectFrom(
     *     (eb) => eb.selectFrom('person').select('person.id as identifier').as('p')
     *   )
     *   .select('p.identifier')
     *   .execute()
     *
     * console.log(persons[0].identifier)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."identifier",
     * from (
     *   select "person"."id" as "identifier" from "person"
     * ) as p
     * ```
     *
     * Create a select query from raw sql:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db
     *   .selectFrom(sql<{ one: number }>`(select 1 as one)`.as('q'))
     *   .select('q.one')
     *   .execute()
     *
     * console.log(items[0].one)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "q"."one",
     * from (
     *   select 1 as one
     * ) as q
     * ```
     *
     * When you use the `sql` tag you need to also provide the result type of the
     * raw snippet / query so that Kysely can figure out what columns are
     * available for the rest of the query.
     *
     * The `selectFrom` method also accepts an array for multiple tables. All
     * the above examples can also be used in an array.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const items = await db.selectFrom([
     *     'person as p',
     *     db.selectFrom('pet').select('pet.species').as('a'),
     *     sql<{ one: number }>`(select 1 as one)`.as('q')
     *   ])
     *   .select(['p.id', 'a.species', 'q.one'])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p".id, "a"."species", "q"."one"
     * from
     *   "person" as "p",
     *   (select "pet"."species" from "pet") as a,
     *   (select 1 as one) as "q"
     * ```
     */
    selectFrom<TE extends TableExpression<DB, keyof DB>>(from: TE[]): SelectQueryBuilder<From<DB, TE>, FromTables<DB, never, TE>, {}>;
    selectFrom<TE extends TableExpression<DB, keyof DB>>(from: TE): SelectQueryBuilder<From<DB, TE>, FromTables<DB, never, TE>, {}>;
    /**
     * Creates an insert query.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
     * the {@link ReturningInterface.returning | returning} method for a way to return columns
     * on supported databases like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * Some databases like PostgreSQL support the `returning` method:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirst()
     * ```
     */
    insertInto<T extends keyof DB & string>(table: T): InsertQueryBuilder<DB, T, InsertResult>;
    /**
     * Creates a replace query.
     *
     * A MySQL-only statement similar to {@link InsertQueryBuilder.onDuplicateKeyUpdate}
     * that deletes and inserts values on collision instead of updating existing rows.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .replaceInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     */
    replaceInto<T extends keyof DB & string>(table: T): InsertQueryBuilder<DB, T, InsertResult>;
    /**
     * Creates a delete query.
     *
     * See the {@link DeleteQueryBuilder.where} method for examples on how to specify
     * a where clause for the delete operation.
     *
     * The return value of the query is an instance of {@link DeleteResult}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .deleteFrom('person')
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numDeletedRows)
     * ```
     */
    deleteFrom<TR extends TableReference<DB>>(table: TR): DeleteQueryBuilder<From<DB, TR>, FromTables<DB, never, TR>, DeleteResult>;
    /**
     * Creates an update query.
     *
     * See the {@link UpdateQueryBuilder.where} method for examples on how to specify
     * a where clause for the update operation.
     *
     * See the {@link UpdateQueryBuilder.set} method for examples on how to
     * specify the updates.
     *
     * The return value of the query is an {@link UpdateResult}.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .updateTable('person')
     *   .set({ first_name: 'Jennifer' })
     *   .where('person.id', '=', 1)
     *   .executeTakeFirst()
     *
     * console.log(result.numUpdatedRows)
     * ```
     */
    updateTable<TR extends TableReference<DB>>(table: TR): UpdateQueryBuilder<From<DB, TR>, FromTables<DB, never, TR>, FromTables<DB, never, TR>, UpdateResult>;
    /**
     * Creates a `with` query (Common Table Expression).
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .with('jennifers', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     .select(['id', 'age'])
     *   )
     *   .with('adult_jennifers', (db) => db
     *     .selectFrom('jennifers')
     *     .where('age', '>', 18)
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('adult_jennifers')
     *   .where('age', '<', 60)
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The CTE name can optionally specify column names in addition to
     * a name. In that case Kysely requires the expression to retun
     * rows with the same columns.
     *
     * ```ts
     * await db
     *   .with('jennifers(id, age)', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     // This is ok since we return columns with the same
     *     // names as specified by `jennifers(id, age)`.
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     */
    with<N extends string, E extends CommonTableExpression<DB, N>>(name: N, expression: E): QueryCreatorWithCommonTableExpression<DB, N, E>;
    /**
     * Creates a recursive `with` query (Common Table Expression).
     *
     * See the {@link with} method for examples and more documentation.
     */
    withRecursive<N extends string, E extends RecursiveCommonTableExpression<DB, N>>(name: N, expression: E): QueryCreatorWithCommonTableExpression<DB, N, E>;
    /**
     * Returns a copy of this query creator instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): QueryCreator<DB>;
    /**
     * Returns a copy of this query creator instance without any plugins.
     */
    withoutPlugins(): QueryCreator<DB>;
    /**
     * Sets the schema to be used for all table references that don't explicitly
     * specify a schema.
     *
     * This only affects the query created through the builder returned from
     * this method and doesn't modify the `db` instance.
     *
     * See [this recipe](https://github.com/koskimas/kysely/tree/master/recipes/schemas.md)
     * for a more detailed explanation.
     *
     * ### Examples
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet')
     *   .selectAll()
     *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "mammals"."pet"
     * inner join "public"."person"
     * on "public"."person"."id" = "mammals"."pet"."owner_id"
     * ```
     *
     * `withSchema` is smart enough to not add schema for aliases,
     * common table expressions or other places where the schema
     * doesn't belong to:
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet as p')
     *   .select('p.name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."name" from "mammals"."pet" as "p"
     * ```
     */
    withSchema(schema: string): QueryCreator<DB>;
}
interface QueryCreatorProps {
    readonly executor: QueryExecutor;
    readonly withNode?: WithNode;
}

declare const LOG_LEVELS: readonly ["query", "error"];
declare type LogLevel = ArrayItemType<typeof LOG_LEVELS>;
interface QueryLogEvent {
    readonly level: 'query';
    readonly query: CompiledQuery;
    readonly queryDurationMillis: number;
}
interface ErrorLogEvent {
    readonly level: 'error';
    readonly error: unknown;
}
declare type LogEvent = QueryLogEvent | ErrorLogEvent;
declare type Logger = (event: LogEvent) => void;
declare type LogConfig = ReadonlyArray<LogLevel> | Logger;
declare class Log {
    #private;
    constructor(config: LogConfig);
    isLevelEnabled(level: LogLevel): boolean;
    query(getEvent: () => QueryLogEvent): void;
    error(getEvent: () => ErrorLogEvent): void;
}

/**
 * The main Kysely class.
 *
 * You should create one instance of `Kysely` per database using the {@link Kysely}
 * constructor. Each `Kysely` instance maintains it's own connection pool.
 *
 * ### Examples
 *
 * This example assumes your database has tables `person` and `pet`:
 *
 * ```ts
 * import { Kysely, Generated, PostgresDialect } from 'kysely'
 *
 * interface PersonTable {
 *   id: Generated<number>
 *   first_name: string
 *   last_name: string
 * }
 *
 * interface PetTable {
 *   id: Generated<number>
 *   owner_id: number
 *   name: string
 *   species 'cat' | 'dog'
 * }
 *
 * interface Database {
 *   person: PersonTable,
 *   pet: PetTable
 * }
 *
 * const db = new Kysely<Database>({
 *   dialect: new PostgresDialect({
 *     host: 'localhost',
 *     database: 'kysely_test',
 *   })
 * })
 * ```
 *
 * @typeParam DB - The database interface type. Keys of this type must be table names
 *    in the database and values must be interfaces that describe the rows in those
 *    tables. See the examples above.
 */
declare class Kysely<DB> extends QueryCreator<DB> implements QueryExecutorProvider {
    #private;
    constructor(args: KyselyConfig);
    constructor(args: KyselyProps);
    /**
     * Returns the {@link SchemaModule} module for building database schema.
     */
    get schema(): SchemaModule;
    /**
     * Returns a the {@link DynamicModule} module.
     *
     * The {@link DynamicModule} module can be used to bypass strict typing and
     * passing in dynamic values for the queries.
     */
    get dynamic(): DynamicModule;
    /**
     * Returns a {@link DatabaseIntrospector | database introspector}.
     */
    get introspection(): DatabaseIntrospector;
    /**
     * Returns a {@link FunctionModule} that can be used to write type safe function
     * calls.
     *
     * ```ts
     * const { count } = db.fn
     *
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'person.id',
     *     count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "pet_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     */
    get fn(): FunctionModule<DB, keyof DB>;
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws, the transaction is rolled back. Otherwise
     * the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * ### Examples
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   await someFunction(trx, jennifer)
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       user_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat'
     *     })
     *     .returning('*')
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     * ```
     */
    transaction(): TransactionBuilder<DB>;
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     * ```
     */
    connection(): ConnectionBuilder<DB>;
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): Kysely<DB>;
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins(): Kysely<DB>;
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * @example
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables<T extends Record<string, Record<string, any>>>(): Kysely<DB & T>;
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    destroy(): Promise<void>;
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction(): boolean;
    /**
     * @internal
     * @private
     */
    getExecutor(): QueryExecutor;
}
declare class Transaction<DB> extends Kysely<DB> {
    #private;
    constructor(props: KyselyProps);
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction(): true;
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws, the transaction is rolled back. Otherwise
     * the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * ### Examples
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   await someFunction(trx, jennifer)
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       user_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat'
     *     })
     *     .returning('*')
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     * ```
     */
    transaction(): TransactionBuilder<DB>;
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     * ```
     */
    connection(): ConnectionBuilder<DB>;
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    destroy(): Promise<void>;
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin: KyselyPlugin): Transaction<DB>;
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins(): Transaction<DB>;
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * @example
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables<T extends Record<string, Record<string, any>>>(): Transaction<DB & T>;
}
interface KyselyProps {
    readonly config: KyselyConfig;
    readonly driver: Driver;
    readonly executor: QueryExecutor;
    readonly dialect: Dialect;
}
declare function isKyselyProps(obj: unknown): obj is KyselyProps;
interface KyselyConfig {
    readonly dialect: Dialect;
    readonly plugins?: KyselyPlugin[];
    /**
     * A list of log levels to log or a custom logger function.
     *
     * Currently there's only two levels: `query` and `error`.
     * This will be expanded based on user feedback later.
     *
     * ### Examples
     *
     * ```ts
     * const db = new Kysely<Database>({
     *   dialect: new PostgresDialect(postgresConfig),
     *   log: ['query', 'error']
     * })
     * ```
     *
     * ```ts
     * const db = new Kysely<Database>({
     *   dialect: new PostgresDialect(postgresConfig),
     *   log(event): void {
     *     if (event.level === 'query') {
     *       console.log(event.query.sql)
     *       console.log(event.query.parameters)
     *     }
     *   }
     * })
     * ```
     */
    readonly log?: LogConfig;
}
declare class ConnectionBuilder<DB> {
    #private;
    constructor(props: ConnectionBuilderProps);
    execute<T>(callback: (db: Kysely<DB>) => Promise<T>): Promise<T>;
}
interface ConnectionBuilderProps extends KyselyProps {
}
declare class TransactionBuilder<DB> {
    #private;
    constructor(props: TransactionBuilderProps);
    setIsolationLevel(isolationLevel: IsolationLevel): TransactionBuilder<DB>;
    execute<T>(callback: (trx: Transaction<DB>) => Promise<T>): Promise<T>;
}
interface TransactionBuilderProps extends KyselyProps {
    readonly isolationLevel?: IsolationLevel;
}

interface Sql {
    /**
     * Template tag for creating raw SQL snippets and queries.
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const id = 123
     * const snippet = sql<Person[]>`select * from person where id = ${id}`
     * ```
     *
     * Substitutions (the things inside `${}`) are automatically passed to the database
     * as parameters and are never interpolated to the SQL string. There's no need to worry
     * about SQL injection vulnerabilities. Substitutions can be values, other `sql`
     * expressions, queries and almost anything else Kysely can produce and they get
     * handled correctly. See the examples below.
     *
     * If you need your substitutions to be interpreted as identifiers, value literals or
     * lists of things, see the {@link Sql.ref}, {@link Sql.table}, {@link Sql.id},
     * {@link Sql.literal}, {@link Sql.raw} and {@link Sql.join} functions.
     *
     * You can pass sql snippets returned by the `sql` tag pretty much anywhere. Whenever
     * something can't be done using the Kysely API, you should be able to drop down to
     * raw SQL using the `sql` tag. Here's an example query that uses raw sql in a bunch
     * of methods:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select(
     *     // If you use `sql` in a select statement, remember to call the `as`
     *     // method to give it an alias.
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   )
     *   .where(sql`birthdate between ${date1} and ${date2}`)
     *   // Here we assume we have list of nicknames for the person
     *   // (a list of strings) and we use the PostgreSQL `@>` operator
     *   // to test if all of them are valid nicknames for the user.
     *   .where('nicknames', '@>', sql`ARRAY[${sql.join(nicknames)}]`)
     *   .orderBy(sql`concat(first_name, ' ', last_name)`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select concat(first_name, ' ', last_name) as "full_name"
     * from "person"
     * where birthdate between $1 and $2
     * and "nicknames" @> ARRAY[$3, $4, $5, $6, $7, $8, $9, $10]
     * order by concat(first_name, ' ', last_name)
     * ```
     *
     * SQL snippets can be executed by calling the `execute` method and passing a `Kysely`
     * instance as the only argument:
     *
     * ```ts
     * const result = await sql<Person[]>`select * from person`.execute(db)
     * ```
     *
     * You can merge other `sql` expressions and queries using substitutions:
     *
     * ```ts
     * const petName = db.selectFrom('pet').select('name').limit(1)
     * const fullName = sql`concat(first_name, ' ', last_name)`
     *
     * sql`
     *   select ${fullName} as full_name, ${petName} as pet_name
     *   from person
     * `
     * ```
     *
     * Substitutions also handle {@link ExpressionBuilder.ref},
     * {@link DynamicModule.ref} and pretty much anything else you
     * throw at it. Here's an example of calling a function in a
     * type-safe way:
     *
     * ```ts
     * db.selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     (eb) => {
     *       // The `eb.ref` method is type-safe and only accepts
     *       // column references that are possible.
     *       const firstName = eb.ref('first_name')
     *       const lastName = eb.ref('last_name')
     *
     *       const fullName = sql<string>`concat(${firstName}, ' ', ${lastName})`
     *       return fullName.as('full_name')
     *     }
     *   ])
     * ```
     *
     * don't know if that amount of ceremony is worth the small increase in
     * type-safety though... But it's possible.
     */
    <T = unknown>(sqlFragments: TemplateStringsArray, ...parameters: unknown[]): RawBuilder<T>;
    /**
     * `sql.value(value)` is a shortcut for:
     *
     * ```ts
     * sql<ValueType>`${value}`
     * ```
     */
    value<T>(value: T): RawBuilder<T>;
    /**
     * This can be used to add runtime column references to SQL snippets.
     *
     * By default `${}` substitutions in {@link sql} template strings get
     * transformed into parameters. You can use this function to tell
     * Kysely to interpret them as column references instead.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const columnRef = 'first_name'
     *
     * sql`select ${sql.ref(columnRef)} from person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name" from person
     * ```
     *
     * The refefences can also include a table name:
     *
     * ```ts
     * const columnRef = 'person.first_name'
     *
     * sql`select ${sql.ref(columnRef)}} from person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" from person
     * ```
     *
     * The refefences can also include a schema on supported databases:
     *
     * ```ts
     * const columnRef = 'public.person.first_name'
     *
     * sql`select ${sql.ref(columnRef)}} from person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "public"."person"."first_name" from person
     * ```
     */
    ref(columnReference: string): RawBuilder<unknown>;
    /**
     * This can be used to add runtime table references to SQL snippets.
     *
     * By default `${}` substitutions in {@link sql} template strings get
     * transformed into parameters. You can use this function to tell
     * Kysely to interpret them as table references instead.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const table = 'person'
     *
     * sql`select first_name from ${sql.table(table)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select first_name from "person"
     * ```
     *
     * The refefences can also include a schema on supported databases:
     *
     * ```ts
     * const table = 'public.person'
     *
     * sql`select first_name from ${sql.table(table)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select first_name from "public"."person"
     * ```
     */
    table(tableReference: string): RawBuilder<unknown>;
    /**
     * This can be used to add arbitrary identifiers to SQL snippets.
     *
     * Does the same thing as {@link Sql.ref | ref} and {@link Sql.table | table}
     * but can also be used for any other identifiers like index names.
     *
     * You should use {@link Sql.ref | ref} and {@link Sql.table | table}
     * instead of this whenever possible as they produce a more sematic
     * operation node tree.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const indexName = 'person_first_name_index'
     *
     * sql`create index ${indexName} on person`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on person
     * ```
     *
     * Multiple identifiers get separated by dots:
     *
     * ```ts
     * const schema = 'public'
     * const columnName = 'first_name'
     * const table = 'person'
     *
     * sql`select ${sql.id(schema, table, columnName)}} from ${sql.id(schema, table)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "public"."person"."first_name" from "public"."person"
     * ```
     */
    id(...ids: readonly string[]): RawBuilder<unknown>;
    /**
     * This can be used to add literal values to SQL snippets.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     * You almost always want to use normal substitutions that get sent to the
     * db as parameters.
     *
     * ```ts
     * const firstName = 'first_name'
     *
     * sql`select * from person where first_name = ${sql.literal(firstName)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from person where first_name = 'first_name'
     * ```
     *
     * As you can see from the example above, the value was added directly to
     * the SQL string instead of as a parameter. Only use this function when
     * something can't be sent as a parameter.
     */
    literal(value: unknown): RawBuilder<unknown>;
    /**
     * This can be used to add arbitrary runtime SQL to SQL snippets.
     *
     * WARNING! Using this with unchecked inputs WILL lead to SQL injection
     * vulnerabilities. The input is not checked or escaped by Kysely in any way.
     *
     * ```ts
     * const firstName = "'first_name'"
     *
     * sql`select * from person where first_name = ${sql.raw(firstName)}`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from person where first_name = 'first_name'
     * ```
     *
     * Note that the difference to `sql.literal` is that this function
     * doesn't assume the inputs are values. The input to this function
     * can be any sql and it's simply glued to the parent string as-is.
     */
    raw(anySql: string): RawBuilder<unknown>;
    /**
     * This can be used to add lists of things to SQL snippets.
     *
     * ### Examples
     *
     * ```ts
     * function findByNicknames(nicknames: string[]): Promise<Person[]> {
     *   return db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where('nicknames', '@>', sql`ARRAY[${sql.join(nicknames)}]`)
     *     .execute()
     * }
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * where "nicknames" @> ARRAY[$1, $2, $3, $4, $5, $6, $7, $8]
     * ```
     *
     * The second argument is the joining SQL expression that defaults
     * to
     *
     * ```ts
     * sql`, `
     * ```
     *
     * In addition to values, items in the list can be also {@link sql}
     * expressions, queries or anything else the normal substitutions
     * support:
     *
     * ```ts
     * const things = [
     *   123,
     *   sql`(1 == 1)`,
     *   db.selectFrom('person').selectAll(),
     *   sql.literal(false),
     *   sql.id('first_name')
     * ]
     *
     * sql`BEFORE ${sql.join(things, sql`::varchar, `)} AFTER`
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * BEFORE $1::varchar, (1 == 1)::varchar, (select * from "person")::varchar, false::varchar, "first_name" AFTER
     * ```
     */
    join(array: readonly unknown[], separator?: RawBuilder<any>): RawBuilder<unknown>;
}
declare const sql: Sql;

declare abstract class QueryExecutorBase implements QueryExecutor {
    #private;
    constructor(plugins?: ReadonlyArray<KyselyPlugin>);
    abstract get adapter(): DialectAdapter;
    /**
     * Returns all installed plugins.
     */
    get plugins(): ReadonlyArray<KyselyPlugin>;
    /**
     * Given the query the user has built (expressed as an operation node tree)
     * this method runs it through all plugins' `transformQuery` methods and
     * returns the result.
     */
    transformQuery<T extends RootOperationNode>(node: T, queryId: QueryId): T;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    abstract compileQuery(node: RootOperationNode, queryId: QueryId): CompiledQuery;
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    abstract provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method.
     */
    executeQuery<R>(compiledQuery: CompiledQuery, queryId: QueryId): Promise<QueryResult<R>>;
    /**
     * Executes a compiled query and runs the result through all plugins'
     * `transformResult` method. Results are streamead instead of loaded
     * at once.
     */
    stream<R>(compiledQuery: CompiledQuery, chunkSize: number, queryId: QueryId): AsyncIterableIterator<QueryResult<R>>;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    abstract withConnectionProvider(connectionProvider: ConnectionProvider): QueryExecutorBase;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    abstract withPlugin(plugin: KyselyPlugin): QueryExecutorBase;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    abstract withPlugins(plugin: ReadonlyArray<KyselyPlugin>): QueryExecutorBase;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    abstract withPluginAtFront(plugin: KyselyPlugin): QueryExecutorBase;
    /**
     * Returns a copy of this executor without any plugins.
     */
    abstract withoutPlugins(): QueryExecutorBase;
}

declare class DefaultQueryExecutor extends QueryExecutorBase {
    #private;
    constructor(compiler: QueryCompiler, adapter: DialectAdapter, connectionProvider: ConnectionProvider, plugins?: KyselyPlugin[]);
    /**
     * Returns the adapter for the current dialect.
     */
    get adapter(): DialectAdapter;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    compileQuery(node: RootOperationNode): CompiledQuery;
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    withPlugins(plugins: ReadonlyArray<KyselyPlugin>): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    withPlugin(plugin: KyselyPlugin): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    withPluginAtFront(plugin: KyselyPlugin): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    withConnectionProvider(connectionProvider: ConnectionProvider): DefaultQueryExecutor;
    /**
     * Returns a copy of this executor without any plugins.
     */
    withoutPlugins(): DefaultQueryExecutor;
}

/**
 * A {@link QueryExecutor} subclass that can be used when you don't
 * have a {@link QueryCompiler}, {@link ConnectionProvider} or any
 * other needed things to actually execute queries.
 */
declare class NoopQueryExecutor extends QueryExecutorBase {
    /**
     * Returns the adapter for the current dialect.
     */
    get adapter(): DialectAdapter;
    /**
     * Compiles the transformed query into SQL. You usually want to pass
     * the output of {@link transformQuery} into this method but you can
     * compile any query using this method.
     */
    compileQuery(): CompiledQuery;
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(): Promise<T>;
    /**
     * Returns a copy of this executor with a new connection provider.
     */
    withConnectionProvider(): NoopQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * last plugin.
     */
    withPlugin(plugin: KyselyPlugin): NoopQueryExecutor;
    /**
     * Returns a copy of this executor with a list of plugins added
     * as the last plugins.
     */
    withPlugins(plugins: ReadonlyArray<KyselyPlugin>): NoopQueryExecutor;
    /**
     * Returns a copy of this executor with a plugin added as the
     * first plugin.
     */
    withPluginAtFront(plugin: KyselyPlugin): NoopQueryExecutor;
    /**
     * Returns a copy of this executor without any plugins.
     */
    withoutPlugins(): NoopQueryExecutor;
}
declare const NOOP_QUERY_EXECUTOR: NoopQueryExecutor;

interface AndNode extends OperationNode {
    readonly kind: 'AndNode';
    readonly left: OperationNode;
    readonly right: OperationNode;
}
/**
 * @internal
 */
declare const AndNode: Readonly<{
    is(node: OperationNode): node is AndNode;
    create(left: OperationNode, right: OperationNode): AndNode;
}>;

interface ListNode extends OperationNode {
    readonly kind: 'ListNode';
    readonly items: ReadonlyArray<OperationNode>;
}
/**
 * @internal
 */
declare const ListNode: Readonly<{
    is(node: OperationNode): node is ListNode;
    create(items: ReadonlyArray<OperationNode>): ListNode;
}>;

interface OrNode extends OperationNode {
    readonly kind: 'OrNode';
    readonly left: OperationNode;
    readonly right: OperationNode;
}
/**
 * @internal
 */
declare const OrNode: Readonly<{
    is(node: OperationNode): node is OrNode;
    create(left: OperationNode, right: OperationNode): OrNode;
}>;

interface ParensNode extends OperationNode {
    readonly kind: 'ParensNode';
    readonly node: OperationNode;
}
/**
 * @internal
 */
declare const ParensNode: Readonly<{
    is(node: OperationNode): node is ParensNode;
    create(node: OperationNode): ParensNode;
}>;

interface DefaultInsertValueNode extends OperationNode {
    readonly kind: 'DefaultInsertValueNode';
}
/**
 * @internal
 */
declare const DefaultInsertValueNode: Readonly<{
    is(node: OperationNode): node is DefaultInsertValueNode;
    create(): DefaultInsertValueNode;
}>;

declare abstract class OperationNodeVisitor {
    #private;
    protected readonly nodeStack: OperationNode[];
    protected get parentNode(): OperationNode | undefined;
    protected readonly visitNode: (node: OperationNode) => void;
    protected abstract visitSelectQuery(node: SelectQueryNode): void;
    protected abstract visitSelection(node: SelectionNode): void;
    protected abstract visitColumn(node: ColumnNode): void;
    protected abstract visitAlias(node: AliasNode): void;
    protected abstract visitTable(node: TableNode): void;
    protected abstract visitFrom(node: FromNode): void;
    protected abstract visitReference(node: ReferenceNode): void;
    protected abstract visitAnd(node: AndNode): void;
    protected abstract visitOr(node: OrNode): void;
    protected abstract visitValueList(node: ValueListNode): void;
    protected abstract visitParens(node: ParensNode): void;
    protected abstract visitJoin(node: JoinNode): void;
    protected abstract visitRaw(node: RawNode): void;
    protected abstract visitWhere(node: WhereNode): void;
    protected abstract visitInsertQuery(node: InsertQueryNode): void;
    protected abstract visitDeleteQuery(node: DeleteQueryNode): void;
    protected abstract visitReturning(node: ReturningNode): void;
    protected abstract visitCreateTable(node: CreateTableNode): void;
    protected abstract visitAddColumn(node: AddColumnNode): void;
    protected abstract visitColumnDefinition(node: ColumnDefinitionNode): void;
    protected abstract visitDropTable(node: DropTableNode): void;
    protected abstract visitOrderBy(node: OrderByNode): void;
    protected abstract visitOrderByItem(node: OrderByItemNode): void;
    protected abstract visitGroupBy(node: GroupByNode): void;
    protected abstract visitGroupByItem(node: GroupByItemNode): void;
    protected abstract visitUpdateQuery(node: UpdateQueryNode): void;
    protected abstract visitColumnUpdate(node: ColumnUpdateNode): void;
    protected abstract visitLimit(node: LimitNode): void;
    protected abstract visitOffset(node: OffsetNode): void;
    protected abstract visitOnConflict(node: OnConflictNode): void;
    protected abstract visitOnDuplicateKey(node: OnDuplicateKeyNode): void;
    protected abstract visitCreateIndex(node: CreateIndexNode): void;
    protected abstract visitDropIndex(node: DropIndexNode): void;
    protected abstract visitList(node: ListNode): void;
    protected abstract visitPrimaryKeyConstraint(node: PrimaryKeyConstraintNode): void;
    protected abstract visitUniqueConstraint(node: UniqueConstraintNode): void;
    protected abstract visitReferences(node: ReferencesNode): void;
    protected abstract visitCheckConstraint(node: CheckConstraintNode): void;
    protected abstract visitWith(node: WithNode): void;
    protected abstract visitCommonTableExpression(node: CommonTableExpressionNode): void;
    protected abstract visitCommonTableExpressionName(node: CommonTableExpressionNameNode): void;
    protected abstract visitHaving(node: HavingNode): void;
    protected abstract visitCreateSchema(node: CreateSchemaNode): void;
    protected abstract visitDropSchema(node: DropSchemaNode): void;
    protected abstract visitAlterTable(node: AlterTableNode): void;
    protected abstract visitDropColumn(node: DropColumnNode): void;
    protected abstract visitRenameColumn(node: RenameColumnNode): void;
    protected abstract visitAlterColumn(node: AlterColumnNode): void;
    protected abstract visitModifyColumn(node: ModifyColumnNode): void;
    protected abstract visitAddConstraint(node: AddConstraintNode): void;
    protected abstract visitDropConstraint(node: DropConstraintNode): void;
    protected abstract visitForeignKeyConstraint(node: ForeignKeyConstraintNode): void;
    protected abstract visitDataType(node: DataTypeNode): void;
    protected abstract visitSelectAll(node: SelectAllNode): void;
    protected abstract visitIdentifier(node: IdentifierNode): void;
    protected abstract visitSchemableIdentifier(node: SchemableIdentifierNode): void;
    protected abstract visitValue(node: ValueNode): void;
    protected abstract visitPrimitiveValueList(node: PrimitiveValueListNode): void;
    protected abstract visitOperator(node: OperatorNode): void;
    protected abstract visitCreateView(node: CreateViewNode): void;
    protected abstract visitDropView(node: DropViewNode): void;
    protected abstract visitGenerated(node: GeneratedNode): void;
    protected abstract visitDefaultValue(node: DefaultValueNode): void;
    protected abstract visitOn(node: OnNode): void;
    protected abstract visitValues(node: ValuesNode): void;
    protected abstract visitSelectModifier(node: SelectModifierNode): void;
    protected abstract visitCreateType(node: CreateTypeNode): void;
    protected abstract visitDropType(node: DropTypeNode): void;
    protected abstract visitExplain(node: ExplainNode): void;
    protected abstract visitDefaultInsertValue(node: DefaultInsertValueNode): void;
    protected abstract visitAggregateFunction(node: AggregateFunctionNode): void;
    protected abstract visitOver(node: OverNode): void;
    protected abstract visitPartitionBy(node: PartitionByNode): void;
    protected abstract visitPartitionByItem(node: PartitionByItemNode): void;
    protected abstract visitSetOperation(node: SetOperationNode): void;
    protected abstract visitBinaryOperation(node: BinaryOperationNode): void;
    protected abstract visitUnaryOperation(node: UnaryOperationNode): void;
}

declare class DefaultQueryCompiler extends OperationNodeVisitor implements QueryCompiler {
    #private;
    protected get numParameters(): number;
    compileQuery(node: RootOperationNode): CompiledQuery;
    protected getSql(): string;
    protected visitSelectQuery(node: SelectQueryNode): void;
    protected visitFrom(node: FromNode): void;
    protected visitSelection(node: SelectionNode): void;
    protected visitColumn(node: ColumnNode): void;
    protected compileDistinctOn(expressions: ReadonlyArray<OperationNode>): void;
    protected compileList(nodes: ReadonlyArray<OperationNode>, separator?: string): void;
    protected visitWhere(node: WhereNode): void;
    protected visitHaving(node: HavingNode): void;
    protected visitInsertQuery(node: InsertQueryNode): void;
    protected visitValues(node: ValuesNode): void;
    protected visitDeleteQuery(node: DeleteQueryNode): void;
    protected visitReturning(node: ReturningNode): void;
    protected visitAlias(node: AliasNode): void;
    protected visitReference(node: ReferenceNode): void;
    protected visitSelectAll(_: SelectAllNode): void;
    protected visitIdentifier(node: IdentifierNode): void;
    protected compileUnwrappedIdentifier(node: IdentifierNode): void;
    protected visitAnd(node: AndNode): void;
    protected visitOr(node: OrNode): void;
    protected visitValue(node: ValueNode): void;
    protected visitValueList(node: ValueListNode): void;
    protected visitPrimitiveValueList(node: PrimitiveValueListNode): void;
    protected visitParens(node: ParensNode): void;
    protected visitJoin(node: JoinNode): void;
    protected visitOn(node: OnNode): void;
    protected visitRaw(node: RawNode): void;
    protected visitOperator(node: OperatorNode): void;
    protected visitTable(node: TableNode): void;
    protected visitSchemableIdentifier(node: SchemableIdentifierNode): void;
    protected visitCreateTable(node: CreateTableNode): void;
    protected visitColumnDefinition(node: ColumnDefinitionNode): void;
    protected getAutoIncrement(): string;
    protected visitReferences(node: ReferencesNode): void;
    protected visitDropTable(node: DropTableNode): void;
    protected visitDataType(node: DataTypeNode): void;
    protected visitOrderBy(node: OrderByNode): void;
    protected visitOrderByItem(node: OrderByItemNode): void;
    protected visitGroupBy(node: GroupByNode): void;
    protected visitGroupByItem(node: GroupByItemNode): void;
    protected visitUpdateQuery(node: UpdateQueryNode): void;
    protected visitColumnUpdate(node: ColumnUpdateNode): void;
    protected visitLimit(node: LimitNode): void;
    protected visitOffset(node: OffsetNode): void;
    protected visitOnConflict(node: OnConflictNode): void;
    protected visitOnDuplicateKey(node: OnDuplicateKeyNode): void;
    protected visitCreateIndex(node: CreateIndexNode): void;
    protected visitDropIndex(node: DropIndexNode): void;
    protected visitCreateSchema(node: CreateSchemaNode): void;
    protected visitDropSchema(node: DropSchemaNode): void;
    protected visitPrimaryKeyConstraint(node: PrimaryKeyConstraintNode): void;
    protected visitUniqueConstraint(node: UniqueConstraintNode): void;
    protected visitCheckConstraint(node: CheckConstraintNode): void;
    protected visitForeignKeyConstraint(node: ForeignKeyConstraintNode): void;
    protected visitList(node: ListNode): void;
    protected visitWith(node: WithNode): void;
    protected visitCommonTableExpression(node: CommonTableExpressionNode): void;
    protected visitCommonTableExpressionName(node: CommonTableExpressionNameNode): void;
    protected visitAlterTable(node: AlterTableNode): void;
    protected visitAddColumn(node: AddColumnNode): void;
    protected visitRenameColumn(node: RenameColumnNode): void;
    protected visitDropColumn(node: DropColumnNode): void;
    protected visitAlterColumn(node: AlterColumnNode): void;
    protected visitModifyColumn(node: ModifyColumnNode): void;
    protected visitAddConstraint(node: AddConstraintNode): void;
    protected visitDropConstraint(node: DropConstraintNode): void;
    protected visitSetOperation(node: SetOperationNode): void;
    protected visitCreateView(node: CreateViewNode): void;
    protected visitDropView(node: DropViewNode): void;
    protected visitGenerated(node: GeneratedNode): void;
    protected visitDefaultValue(node: DefaultValueNode): void;
    protected visitSelectModifier(node: SelectModifierNode): void;
    protected visitCreateType(node: CreateTypeNode): void;
    protected visitDropType(node: DropTypeNode): void;
    protected visitExplain(node: ExplainNode): void;
    protected visitDefaultInsertValue(_: DefaultInsertValueNode): void;
    protected visitAggregateFunction(node: AggregateFunctionNode): void;
    protected visitOver(node: OverNode): void;
    protected visitPartitionBy(node: PartitionByNode): void;
    protected visitPartitionByItem(node: PartitionByItemNode): void;
    protected visitBinaryOperation(node: BinaryOperationNode): void;
    protected visitUnaryOperation(node: UnaryOperationNode): void;
    protected append(str: string): void;
    protected appendValue(parameter: unknown): void;
    protected getLeftIdentifierWrapper(): string;
    protected getRightIdentifierWrapper(): string;
    protected getCurrentParameterPlaceholder(): string;
    protected getLeftExplainOptionsWrapper(): string;
    protected getExplainOptionAssignment(): string;
    protected getExplainOptionsDelimiter(): string;
    protected getRightExplainOptionsWrapper(): string;
    protected sanitizeIdentifier(identifier: string): string;
    protected addParameter(parameter: unknown): void;
    protected appendImmediateValue(value: unknown): void;
}

declare class DefaultConnectionProvider implements ConnectionProvider {
    #private;
    constructor(driver: Driver);
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
}

declare class SingleConnectionProvider implements ConnectionProvider {
    #private;
    constructor(connection: DatabaseConnection);
    /**
     * Provides a connection for the callback and takes care of disposing
     * the connection after the callback has been run.
     */
    provideConnection<T>(consumer: (connection: DatabaseConnection) => Promise<T>): Promise<T>;
}

/**
 * A driver that does absolutely nothing.
 *
 * You can use this to create Kysely instances solely for building queries
 *
 * ### Examples
 *
 * This example creates a Kysely instance for building postgres queries:
 *
 * ```ts
 * const db = new Kysely<Database>({
 *   dialect: {
 *     createAdapter() {
 *       return new PostgresAdapter()
 *     },
 *     createDriver() {
 *       return new DummyDriver()
 *     },
 *     createIntrospector(db: Kysely<any>) {
 *       return new PostgresIntrospector(db)
 *     },
 *     createQueryCompiler() {
 *       return new PostgresQueryCompiler()
 *     },
 *   },
 * })
 * ```
 *
 * You can use it to build a query and compile it to SQL but trying to
 * execute the query will throw an error.
 *
 * ```ts
 * const { sql } = db.selectFrom('person').selectAll().compile()
 * console.log(sql) // select * from "person"
 * ```
 */
declare class DummyDriver implements Driver {
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}

/**
 * A basic implementation of `DialectAdapter` with sensible default values.
 * 3rd party dialects can extend this instead of implementing the `DialectAdapter`
 * interface from scratch. That way all new settings will get default values when
 * they are added and there will be less breaking changes.
 */
declare abstract class DialectAdapterBase implements DialectAdapter {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MIGRATION_LOCK_TABLE}
     * created by Kysely can be used instead. {@link MIGRATION_LOCK_TABLE}
     * has two columns `id` and `is_locked` and there's only one row in the
     * table whose id is {@link MIGRATION_LOCK_ID}. `is_locked` is an integer.
     * Kysely takes care of creating the lock table and inserting the one single
     * row to it before this method is executed.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    abstract acquireMigrationLock(db: Kysely<any>): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    abstract releaseMigrationLock(db: Kysely<any>): Promise<void>;
}

/**
 * Config for the SQLite dialect.
 */
interface SqliteDialectConfig {
    /**
     * An sqlite Database instance or a function that returns one.
     *
     * If a function is provided, it's called once when the first query is executed.
     *
     * https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#new-databasepath-options
     */
    database: SqliteDatabase | (() => Promise<SqliteDatabase>);
    /**
     * Called once when the first query is executed.
     *
     * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
     */
    onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}
/**
 * This interface is the subset of better-sqlite3 driver's `Database` class that
 * kysely needs.
 *
 * We don't use the type from `better-sqlite3` here to not have a dependency to it.
 *
 * https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#new-databasepath-options
 */
interface SqliteDatabase {
    close(): void;
    prepare(sql: string): SqliteStatement;
}
interface SqliteStatement {
    readonly reader: boolean;
    all(parameters: ReadonlyArray<unknown>): unknown[];
    run(parameters: ReadonlyArray<unknown>): {
        changes: number | bigint;
        lastInsertRowid: number | bigint;
    };
}

/**
 * SQLite dialect that uses the [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) library.
 *
 * The constructor takes an instance of {@link SqliteDialectConfig}.
 *
 * ```ts
 * import Database from 'better-sqlite3'
 *
 * new SqliteDialect({
 *   database: new Database('db.sqlite')
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `database`
 * can be a function:
 *
 * ```ts
 * import Database from 'better-sqlite3'
 *
 * new SqliteDialect({
 *   database: async () => new Database('db.sqlite')
 * })
 */
declare class SqliteDialect implements Dialect {
    #private;
    constructor(config: SqliteDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare class SqliteDriver implements Driver {
    #private;
    constructor(config: SqliteDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}

declare class PostgresQueryCompiler extends DefaultQueryCompiler {
    protected sanitizeIdentifier(identifier: string): string;
}

declare class PostgresIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get table metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class PostgresAdapter extends DialectAdapterBase {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MIGRATION_LOCK_TABLE}
     * created by Kysely can be used instead. {@link MIGRATION_LOCK_TABLE}
     * has two columns `id` and `is_locked` and there's only one row in the
     * table whose id is {@link MIGRATION_LOCK_ID}. `is_locked` is an integer.
     * Kysely takes care of creating the lock table and inserting the one single
     * row to it before this method is executed.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(): Promise<void>;
}

/**
 * Config for the MySQL dialect.
 *
 * https://github.com/sidorares/node-mysql2#using-connection-pools
 */
interface MysqlDialectConfig {
    /**
     * A mysql2 Pool instance or a function that returns one.
     *
     * If a function is provided, it's called once when the first query is executed.
     *
     * https://github.com/sidorares/node-mysql2#using-connection-pools
     */
    pool: MysqlPool | (() => Promise<MysqlPool>);
    /**
     * Called once for each created connection.
     */
    onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}
/**
 * This interface is the subset of mysql2 driver's `Pool` class that
 * kysely needs.
 *
 * We don't use the type from `mysql2` here to not have a dependency to it.
 *
 * https://github.com/sidorares/node-mysql2#using-connection-pools
 */
interface MysqlPool {
    getConnection(callback: (error: unknown, connection: MysqlPoolConnection) => void): void;
    end(callback: (error: unknown) => void): void;
}
interface MysqlPoolConnection {
    query(sql: string, parameters: ReadonlyArray<unknown>): {
        stream: <T>(options: MysqlStreamOptions) => MysqlStream<T>;
    };
    query(sql: string, parameters: ReadonlyArray<unknown>, callback: (error: unknown, result: MysqlQueryResult) => void): void;
    release(): void;
}
interface MysqlStreamOptions {
    highWaterMark?: number;
    objectMode?: boolean;
}
interface MysqlStream<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}
interface MysqlOkPacket {
    affectedRows: number;
    insertId: number;
}
declare type MysqlQueryResult = MysqlOkPacket | Record<string, unknown>[];

/**
 * MySQL dialect that uses the [mysql2](https://github.com/sidorares/node-mysql2#readme) library.
 *
 * The constructor takes an instance of {@link MysqlDialectConfig}.
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { createPool } from 'mysql2'
 *
 * new MysqlDialect({
 *   pool: async () => createPool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
declare class MysqlDialect implements Dialect {
    #private;
    constructor(config: MysqlDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare const PRIVATE_RELEASE_METHOD$1: unique symbol;
declare class MysqlDriver implements Driver {
    #private;
    constructor(configOrPool: MysqlDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: MysqlConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
declare class MysqlConnection implements DatabaseConnection {
    #private;
    constructor(rawConnection: MysqlPoolConnection);
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    streamQuery<O>(compiledQuery: CompiledQuery, chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
    [PRIVATE_RELEASE_METHOD$1](): void;
}

declare class MysqlQueryCompiler extends DefaultQueryCompiler {
    protected getCurrentParameterPlaceholder(): string;
    protected getLeftExplainOptionsWrapper(): string;
    protected getExplainOptionAssignment(): string;
    protected getExplainOptionsDelimiter(): string;
    protected getRightExplainOptionsWrapper(): string;
    protected getLeftIdentifierWrapper(): string;
    protected getRightIdentifierWrapper(): string;
    protected sanitizeIdentifier(identifier: string): string;
}

declare class MysqlIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get table metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class MysqlAdapter extends DialectAdapterBase {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MIGRATION_LOCK_TABLE}
     * created by Kysely can be used instead. {@link MIGRATION_LOCK_TABLE}
     * has two columns `id` and `is_locked` and there's only one row in the
     * table whose id is {@link MIGRATION_LOCK_ID}. `is_locked` is an integer.
     * Kysely takes care of creating the lock table and inserting the one single
     * row to it before this method is executed.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(db: Kysely<any>): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(db: Kysely<any>): Promise<void>;
}

/**
 * Config for the PostgreSQL dialect.
 */
interface PostgresDialectConfig {
    /**
     * A postgres Pool instance or a function that returns one.
     *
     * If a function is provided, it's called once when the first query is executed.
     *
     * https://node-postgres.com/api/pool
     */
    pool: PostgresPool | (() => Promise<PostgresPool>);
    /**
     * https://github.com/brianc/node-postgres/tree/master/packages/pg-cursor
     * ```ts
     * import Cursor from 'pg-cursor'
     * // or
     * import * as Cursor from 'pg-cursor'
     *
     * new PostgresDialect({
     *  cursor: Cursor
     * })
     * ```
     */
    cursor?: PostgresCursorConstructor;
    /**
     * Called once for each created connection.
     */
    onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}
/**
 * This interface is the subset of pg driver's `Pool` class that
 * kysely needs.
 *
 * We don't use the type from `pg` here to not have a dependency to it.
 *
 * https://node-postgres.com/api/pool
 */
interface PostgresPool {
    connect(): Promise<PostgresPoolClient>;
    end(): Promise<void>;
}
interface PostgresPoolClient {
    query<R>(sql: string, parameters: ReadonlyArray<unknown>): Promise<PostgresQueryResult<R>>;
    query<R>(cursor: PostgresCursor<R>): PostgresCursor<R>;
    release(): void;
}
interface PostgresCursor<T> {
    read(rowsCount: number): Promise<T[]>;
    close(): Promise<void>;
}
declare type PostgresCursorConstructor = new <T>(sql: string, parameters: unknown[]) => PostgresCursor<T>;
interface PostgresQueryResult<R> {
    command: 'UPDATE' | 'DELETE' | 'INSERT' | 'SELECT';
    rowCount: number;
    rows: R[];
}
interface PostgresStream<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

declare const PRIVATE_RELEASE_METHOD: unique symbol;
declare class PostgresDriver implements Driver {
    #private;
    constructor(config: PostgresDialectConfig);
    /**
     * Initializes the driver.
     *
     * After calling this method the driver should be usable and `acquireConnection` etc.
     * methods should be callable.
     */
    init(): Promise<void>;
    /**
     * Acquires a new connection from the pool.
     */
    acquireConnection(): Promise<DatabaseConnection>;
    /**
     * Begins a transaction.
     */
    beginTransaction(connection: DatabaseConnection, settings: TransactionSettings): Promise<void>;
    /**
     * Commits a transaction.
     */
    commitTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Rolls back a transaction.
     */
    rollbackTransaction(connection: DatabaseConnection): Promise<void>;
    /**
     * Releases a connection back to the pool.
     */
    releaseConnection(connection: PostgresConnection): Promise<void>;
    /**
     * Destroys the driver and releases all resources.
     */
    destroy(): Promise<void>;
}
interface PostgresConnectionOptions {
    cursor: PostgresCursorConstructor | null;
}
declare class PostgresConnection implements DatabaseConnection {
    #private;
    constructor(client: PostgresPoolClient, options: PostgresConnectionOptions);
    executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>>;
    streamQuery<O>(compiledQuery: CompiledQuery, chunkSize: number): AsyncIterableIterator<QueryResult<O>>;
    [PRIVATE_RELEASE_METHOD](): void;
}

/**
 * PostgreSQL dialect that uses the [pg](https://node-postgres.com/) library.
 *
 * The constructor takes an instance of {@link PostgresDialectConfig}.
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `pool`
 * can be a function:
 *
 * ```ts
 * import { Pool } from 'pg'
 *
 * new PostgresDialect({
 *   pool: async () => new Pool({
 *     database: 'some_db',
 *     host: 'localhost',
 *   })
 * })
 * ```
 */
declare class PostgresDialect implements Dialect {
    #private;
    constructor(config: PostgresDialectConfig);
    /**
     * Creates a driver for the dialect.
     */
    createDriver(): Driver;
    /**
     * Creates a query compiler for the dialect.
     */
    createQueryCompiler(): QueryCompiler;
    /**
     * Creates an adapter for the dialect.
     */
    createAdapter(): DialectAdapter;
    /**
     * Creates a database introspector that can be used to get database metadata
     * such as the table names and column names of those tables.
     *
     * `db` never has any plugins installed. It's created using
     * {@link Kysely.withoutPlugins}.
     */
    createIntrospector(db: Kysely<any>): DatabaseIntrospector;
}

declare class SqliteQueryCompiler extends DefaultQueryCompiler {
    protected getCurrentParameterPlaceholder(): string;
    protected getLeftExplainOptionsWrapper(): string;
    protected getRightExplainOptionsWrapper(): string;
    protected getLeftIdentifierWrapper(): string;
    protected getRightIdentifierWrapper(): string;
    protected getAutoIncrement(): string;
    protected sanitizeIdentifier(identifier: string): string;
    protected visitDefaultInsertValue(_: DefaultInsertValueNode): void;
}

declare class SqliteIntrospector implements DatabaseIntrospector {
    #private;
    constructor(db: Kysely<any>);
    /**
     * Get schema metadata.
     */
    getSchemas(): Promise<SchemaMetadata[]>;
    /**
     * Get table metadata.
     */
    getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]>;
    /**
     * Get the database metadata such as table and column names.
     *
     * @deprecated Use getTables() instead.
     */
    getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata>;
}

declare class SqliteAdapter implements DialectAdapterBase {
    /**
     * Whether or not this dialect supports transactional DDL.
     *
     * If this is true, migrations are executed inside a transaction.
     */
    get supportsTransactionalDdl(): boolean;
    /**
     * Whether or not this dialect supports the `returning` in inserts
     * updates and deletes.
     */
    get supportsReturning(): boolean;
    /**
     * This method is used to acquire a lock for the migrations so that
     * it's not possible for two migration operations to run in parallel.
     *
     * Most dialects have explicit locks that can be used, like advisory locks
     * in PostgreSQL and the get_lock function in MySQL.
     *
     * If the dialect doesn't have explicit locks the {@link MIGRATION_LOCK_TABLE}
     * created by Kysely can be used instead. {@link MIGRATION_LOCK_TABLE}
     * has two columns `id` and `is_locked` and there's only one row in the
     * table whose id is {@link MIGRATION_LOCK_ID}. `is_locked` is an integer.
     * Kysely takes care of creating the lock table and inserting the one single
     * row to it before this method is executed.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations will be executed. Otherwise
     * `db` is a single connection (session) that will be used to execute the
     * migrations.
     */
    acquireMigrationLock(): Promise<void>;
    /**
     * Releases the migration lock. See {@link acquireMigrationLock}.
     *
     * If `supportsTransactionalDdl` is `true` then the `db` passed to this method
     * is a transaction inside which the migrations were executed. Otherwise `db`
     * is a single connection (session) that was used to execute the migrations
     * and the `acquireMigrationLock` call.
     */
    releaseMigrationLock(): Promise<void>;
}

declare const DEFAULT_MIGRATION_TABLE = "kysely_migration";
declare const DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
declare const MIGRATION_LOCK_ID = "migration_lock";
declare const NO_MIGRATIONS: NoMigrations;
interface Migration {
    up(db: Kysely<any>): Promise<void>;
    /**
     * An optional down method.
     *
     * If you don't provide a down method, the migration is skipped when
     * migrating down.
     */
    down?(db: Kysely<any>): Promise<void>;
}
/**
 * A class for running migrations.
 *
 * ### Example
 *
 * This example uses the {@link FileMigrationProvider} that reads migrations
 * files from a single folder. You can easily implement your own
 * {@link MigrationProvider} if you want to provide migrations some
 * other way.
 *
 * ```ts
 * const migrator = new Migrator({
 *   db,
 *   provider: new FileMigrationProvider(
 *     // Path to the folder that contains all your migrations.
 *     'some/path/to/migrations'
 *   )
 * })
 * ```
 */
declare class Migrator {
    #private;
    constructor(props: MigratorProps);
    /**
     * Returns a {@link MigrationInfo} object for each migration.
     *
     * The returned array is sorted by migration name.
     */
    getMigrations(): Promise<ReadonlyArray<MigrationInfo>>;
    /**
     * Runs all migrations that have not yet been run.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed. See the examples below.
     *
     * This method goes through all possible migrations provided by the provider and runs the
     * ones whose names come alphabetically after the last migration that has been run. If the
     * list of executed migrations doesn't match the beginning of the list of possible migrations
     * an error is thrown.
     *
     * ### Examples
     *
     * ```ts
     * const db = new Kysely<Database>({
     *   dialect: new PostgresDialect({
     *     host: 'localhost',
     *     database: 'kysely_test',
     *   }),
     * })
     *
     * const migrator = new Migrator({
     *   db,
     *   provider: new FileMigrationProvider(
     *     // Path to the folder that contains all your migrations.
     *     'some/path/to/migrations'
     *   )
     * })
     *
     * const { error, results } = await migrator.migrateToLatest()
     *
     * results?.forEach((it) => {
     *   if (it.status === 'Success') {
     *     console.log(`migration "${it.migrationName}" was executed successfully`)
     *   } else if (it.status === 'Error') {
     *     console.error(`failed to execute migration "${it.migrationName}"`)
     *   }
     * })
     *
     * if (error) {
     *   console.error('failed to run `migrateToLatest`')
     *   console.error(error)
     * }
     * ```
     */
    migrateToLatest(): Promise<MigrationResultSet>;
    /**
     * Migrate up/down to a specific migration.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * await migrator.migrateTo('some_migration')
     * ```
     *
     * If you specify the name of the first migration, this method migrates
     * down to the first migration, but doesn't run the `down` method of
     * the first migration. In case you want to migrate all the way down,
     * you can use a special constant `NO_MIGRATIONS`:
     *
     * ```ts
     * await migrator.migrateTo(NO_MIGRATIONS)
     * ```
     */
    migrateTo(targetMigrationName: string | NoMigrations): Promise<MigrationResultSet>;
    /**
     * Migrate one step up.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * await migrator.migrateUp()
     * ```
     */
    migrateUp(): Promise<MigrationResultSet>;
    /**
     * Migrate one step down.
     *
     * This method returns a {@link MigrationResultSet} instance and _never_ throws.
     * {@link MigrationResultSet.error} holds the error if something went wrong.
     * {@link MigrationResultSet.results} contains information about which migrations
     * were executed and which failed.
     *
     * ### Examples
     *
     * ```ts
     * await migrator.migrateDown()
     * ```
     */
    migrateDown(): Promise<MigrationResultSet>;
}
interface MigratorProps {
    readonly db: Kysely<any>;
    readonly provider: MigrationProvider;
    /**
     * The name of the internal migration table. Defaults to `kysely_migration`.
     *
     * If you do specify this, you need to ALWAYS use the same value. Kysely doesn't
     * support changing the table on the fly. If you run the migrator even once with a
     * table name X and then change the table name to Y, kysely will create a new empty
     * migration table and attempt to run the migrations again, which will obviously
     * fail.
     *
     * If you do specify this, ALWAYS ALWAYS use the same value from the beginning of
     * the project, to the end of time or prepare to manually migrate the migration
     * tables.
     */
    readonly migrationTableName?: string;
    /**
     * The name of the internal migration lock table. Defaults to `kysely_migration_lock`.
     *
     * If you do specify this, you need to ALWAYS use the same value. Kysely doesn't
     * support changing the table on the fly. If you run the migrator even once with a
     * table name X and then change the table name to Y, kysely will create a new empty
     * lock table.
     *
     * If you do specify this, ALWAYS ALWAYS use the same value from the beginning of
     * the project, to the end of time or prepare to manually migrate the migration
     * tables.
     */
    readonly migrationLockTableName?: string;
    /**
     * The schema of the internal migration tables. Defaults to the default schema
     * on dialects that support schemas.
     *
     * If you do specify this, you need to ALWAYS use the same value. Kysely doesn't
     * support changing the schema on the fly. If you run the migrator even once with a
     * schema name X and then change the schema name to Y, kysely will create a new empty
     * migration tables in the new schema and attempt to run the migrations again, which
     * will obviously fail.
     *
     * If you do specify this, ALWAYS ALWAYS use the same value from the beginning of
     * the project, to the end of time or prepare to manually migrate the migration
     * tables.
     *
     * This only works on postgres.
     */
    readonly migrationTableSchema?: string;
}
/**
 * All migration methods ({@link Migrator.migrateTo | migrateTo},
 * {@link Migrator.migrateToLatest | migrateToLatest} etc.) never
 * throw but return this object instead.
 */
interface MigrationResultSet {
    /**
     * This is defined if something went wrong.
     *
     * An error may have occurred in one of the migrations in which case the
     * {@link results} list contains an item with `status === 'Error'` to
     * indicate which migration failed.
     *
     * An error may also have occurred before Kysely was able to figure out
     * which migrations should be executed, in which case the {@link results}
     * list is undefined.
     */
    readonly error?: unknown;
    /**
     * {@link MigrationResult} for each individual migration that was supposed
     * to be executed by the operation.
     *
     * If all went well, each result's `status` is `Success`. If some migration
     * failed, the failed migration's result's `status` is `Error` and all
     * results after that one have `status` ´NotExecuted`.
     *
     * This property can be undefined if an error occurred before Kysely was
     * able to figure out which migrations should be executed.
     *
     * If this list is empty, there were no migrations to execute.
     */
    readonly results?: MigrationResult[];
}
interface MigrationResult {
    readonly migrationName: string;
    /**
     * The direction in which this migration was executed.
     */
    readonly direction: 'Up' | 'Down';
    /**
     * The execution status.
     *
     *  - `Success` means the migration was successfully executed. Note that
     *    if any of the later migrations in the {@link MigrationResult.results}
     *    list failed (have status `Error`) AND the dialect supports transactional
     *    DDL, even the successfull migrations were rolled back.
     *
     *  - `Error` means the migration failed. In this case the
     *    {@link MigrationResult.error} contains the error.
     *
     *  - `NotExecuted` means that the migration was supposed to be executed
     *    but wasn't because an earlier migration failed.
     */
    readonly status: 'Success' | 'Error' | 'NotExecuted';
}
interface MigrationProvider {
    /**
     * Returns all migrations, old and new.
     *
     * For example if you have your migrations in a folder as separate files,
     * you can use the {@link FileMigrationProvider} that implements this
     * method to return all migrations in a folder.
     *
     * The keys of the returned object are migration names and values are the
     * migrations. The order of the migrations is determined by the alphabetical
     * order of the migration names. The items in the object don't need to be
     * sorted, they are sorted by Kysely.
     */
    getMigrations(): Promise<Record<string, Migration>>;
}
/**
 * Type for the {@link NO_MIGRATIONS} constant. Never create one of these.
 */
interface NoMigrations {
    readonly __noMigrations__: true;
}
interface MigrationInfo {
    /**
     * Name of the migration.
     */
    name: string;
    /**
     * The actual migration.
     */
    migration: Migration;
    /**
     * When was the migration executed.
     *
     * If this is undefined, the migration hasn't been executed yet.
     */
    executedAt?: Date;
}

/**
 * Reads all migrations from a folder in node.js.
 *
 * ### Examples
 *
 * ```ts
 * import { promises as fs } from 'fs'
 * import path from 'path'
 *
 * new FileMigrationProvider({
 *   fs,
 *   path,
 *   migrationFolder: 'path/to/migrations/folder'
 * })
 * ```
 */
declare class FileMigrationProvider implements MigrationProvider {
    #private;
    constructor(props: FileMigrationProviderProps);
    /**
     * Returns all migrations, old and new.
     *
     * For example if you have your migrations in a folder as separate files,
     * you can use the {@link FileMigrationProvider} that implements this
     * method to return all migrations in a folder.
     *
     * The keys of the returned object are migration names and values are the
     * migrations. The order of the migrations is determined by the alphabetical
     * order of the migration names. The items in the object don't need to be
     * sorted, they are sorted by Kysely.
     */
    getMigrations(): Promise<Record<string, Migration>>;
}
interface FileMigrationProviderFS {
    readdir(path: string): Promise<string[]>;
}
interface FileMigrationProviderPath {
    join(...path: string[]): string;
}
interface FileMigrationProviderProps {
    fs: FileMigrationProviderFS;
    path: FileMigrationProviderPath;
    migrationFolder: string;
}

interface CamelCasePluginOptions {
    /**
     * If true, camelCase is transformed into upper case SNAKE_CASE.
     * For example `fooBar => FOO_BAR` and `FOO_BAR => fooBar`
     *
     * Defaults to false.
     */
    upperCase?: boolean;
    /**
     * If true, an underscore is added before each digit when converting
     * camelCase to snake_case. For example `foo12Bar => foo_12_bar` and
     * `foo_12_bar => foo12Bar`
     *
     * Defaults to false.
     */
    underscoreBeforeDigits?: boolean;
    /**
     * If true, an underscore is added between consecutive upper case
     * letters when converting from camelCase to snake_case. For example
     * `fooBAR => foo_b_a_r` and `foo_b_a_r => fooBAR`.
     *
     * Defaults to false.
     */
    underscoreBetweenUppercaseLetters?: boolean;
}
/**
 * A plugin that converts snake_case identifiers in the database into
 * camelCase in the javascript side.
 *
 * For example let's assume we have a table called `person_table`
 * with columns `first_name` and `last_name` in the database. When
 * using `CamelCasePlugin` we would setup Kysely like this:
 *
 * ```ts
 * interface Person {
 *   firstName: string
 *   lastName: string
 * }
 *
 * interface Database {
 *   personTable: Person
 * }
 *
 * const db = new Kysely<Database>({
 *   dialect: new PostgresDialect({
 *     database: 'kysely_test',
 *     host: 'localhost',
 *   }),
 *   plugins: [
 *     new CamelCasePlugin()
 *   ]
 * })
 *
 * const person = await db.selectFrom('personTable')
 *   .where('firstName', '=', 'Arnold')
 *   .select(['firstName', 'lastName'])
 *   .executeTakeFirst()
 *
 * // generated sql:
 * // select first_name, last_name from person_table where first_name = $1
 *
 * if (person) {
 *   console.log(person.firstName)
 * }
 * ```
 *
 * As you can see from the example, __everything__ needs to be defined
 * in camelCase in the typescript code: the table names, the columns,
 * schemas, __everything__. When using the `CamelCasePlugin` Kysely
 * works as if the database was defined in camelCase.
 *
 * There are various options you can give to the plugin to modify
 * the way identifiers are converted. See {@link CamelCasePluginOptions}.
 * If those options are not enough, you can override this plugin's
 * `snakeCase` and `camelCase` methods to make the conversion exactly
 * the way you like:
 *
 * ```ts
 * class MyCamelCasePlugin extends CamelCasePlugin {
 *   protected override snakeCase(str: string): string {
 *     return mySnakeCase(str)
 *   }
 *
 *   protected override camelCase(str: string): string {
 *     return myCamelCase(str)
 *   }
 * }
 * ```
 */
declare class CamelCasePlugin implements KyselyPlugin {
    #private;
    constructor(opt?: CamelCasePluginOptions);
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
    protected mapRow(row: UnknownRow): UnknownRow;
    protected snakeCase(str: string): string;
    protected camelCase(str: string): string;
}

/**
 * Plugin that removes duplicate joins from queries.
 *
 * See [this recipe](https://github.com/koskimas/kysely/tree/master/recipes/deduplicate-joins.md)
 */
declare class DeduplicateJoinsPlugin implements KyselyPlugin {
    #private;
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
}

declare class WithSchemaPlugin implements KyselyPlugin {
    #private;
    constructor(schema: string);
    /**
     * This is called for each query before it is executed. You can modify the query by
     * transforming its {@link OperationNode} tree provided in {@link PluginTransformQueryArgs.node | args.node}
     * and returning the transformed tree. You'd usually want to use an {@link OperationNodeTransformer}
     * for this.
     *
     * If you need to pass some query-related data between this method and `transformResult` you
     * can use a `WeakMap` with {@link PluginTransformQueryArgs.queryId | args.queryId} as the key:
     *
     * ```ts
     * const plugin = {
     *   data: new WeakMap<QueryId, SomeData>(),
     *
     *   transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
     *     this.data.set(args.queryId, something)
     *     return args.node
     *   },
     *
     *   transformResult(args: PluginTransformResultArgs): QueryResult<UnknownRow> {
     *     const data = this.data.get(args.queryId)
     *     return args.result
     *   }
     * }
     * ```
     *
     * You should use a `WeakMap` instead of a `Map` or some other strong references because `transformQuery`
     * is not always matched by a call to `transformResult` which would leave orphaned items in the map
     * and cause a memory leak.
     */
    transformQuery(args: PluginTransformQueryArgs): RootOperationNode;
    /**
     * This method is called for each query after it has been executed. The result
     * of the query can be accessed through {@link PluginTransformResultArgs.result | args.result}.
     * You can modify the result and return the modifier result.
     */
    transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>>;
}

/**
 * Transforms an operation node tree into another one.
 *
 * Kysely queries are expressed internally as a tree of objects (operation nodes).
 * `OperationNodeTransformer` takes such a tree as its input and returns a
 * transformed deep copy of it. By default the `OperationNodeTransformer`
 * does nothing. You need to override one or more methods to make it do
 * something.
 *
 * There's a method for each node type. For example if you'd like to convert
 * each identifier (table name, column name, alias etc.) from camelCase to
 * snake_case, you'd do something like this:
 *
 * ```ts
 * class CamelCaseTransformer extends OperationNodeTransformer {
 *   transformIdentifier(node: IdentifierNode): IdentifierNode {
 *     node = super.transformIdentifier(node),
 *
 *     return {
 *       ...node,
 *       name: snakeCase(node.name),
 *     }
 *   }
 * }
 *
 * const transformer = new CamelCaseTransformer()
 * const tree = transformer.transformNode(tree)
 * ```
 */
declare class OperationNodeTransformer {
    #private;
    protected readonly nodeStack: OperationNode[];
    transformNode<T extends OperationNode | undefined>(node: T): T;
    protected transformNodeImpl<T extends OperationNode>(node: T): T;
    protected transformNodeList<T extends ReadonlyArray<OperationNode> | undefined>(list: T): T;
    protected transformSelectQuery(node: SelectQueryNode): SelectQueryNode;
    protected transformSelection(node: SelectionNode): SelectionNode;
    protected transformColumn(node: ColumnNode): ColumnNode;
    protected transformAlias(node: AliasNode): AliasNode;
    protected transformTable(node: TableNode): TableNode;
    protected transformFrom(node: FromNode): FromNode;
    protected transformReference(node: ReferenceNode): ReferenceNode;
    protected transformAnd(node: AndNode): AndNode;
    protected transformOr(node: OrNode): OrNode;
    protected transformValueList(node: ValueListNode): ValueListNode;
    protected transformParens(node: ParensNode): ParensNode;
    protected transformJoin(node: JoinNode): JoinNode;
    protected transformRaw(node: RawNode): RawNode;
    protected transformWhere(node: WhereNode): WhereNode;
    protected transformInsertQuery(node: InsertQueryNode): InsertQueryNode;
    protected transformValues(node: ValuesNode): ValuesNode;
    protected transformDeleteQuery(node: DeleteQueryNode): DeleteQueryNode;
    protected transformReturning(node: ReturningNode): ReturningNode;
    protected transformCreateTable(node: CreateTableNode): CreateTableNode;
    protected transformColumnDefinition(node: ColumnDefinitionNode): ColumnDefinitionNode;
    protected transformAddColumn(node: AddColumnNode): AddColumnNode;
    protected transformDropTable(node: DropTableNode): DropTableNode;
    protected transformOrderBy(node: OrderByNode): OrderByNode;
    protected transformOrderByItem(node: OrderByItemNode): OrderByItemNode;
    protected transformGroupBy(node: GroupByNode): GroupByNode;
    protected transformGroupByItem(node: GroupByItemNode): GroupByItemNode;
    protected transformUpdateQuery(node: UpdateQueryNode): UpdateQueryNode;
    protected transformColumnUpdate(node: ColumnUpdateNode): ColumnUpdateNode;
    protected transformLimit(node: LimitNode): LimitNode;
    protected transformOffset(node: OffsetNode): OffsetNode;
    protected transformOnConflict(node: OnConflictNode): OnConflictNode;
    protected transformOnDuplicateKey(node: OnDuplicateKeyNode): OnDuplicateKeyNode;
    protected transformCreateIndex(node: CreateIndexNode): CreateIndexNode;
    protected transformList(node: ListNode): ListNode;
    protected transformDropIndex(node: DropIndexNode): DropIndexNode;
    protected transformPrimaryKeyConstraint(node: PrimaryKeyConstraintNode): PrimaryKeyConstraintNode;
    protected transformUniqueConstraint(node: UniqueConstraintNode): UniqueConstraintNode;
    protected transformForeignKeyConstraint(node: ForeignKeyConstraintNode): ForeignKeyConstraintNode;
    protected transformSetOperation(node: SetOperationNode): SetOperationNode;
    protected transformReferences(node: ReferencesNode): ReferencesNode;
    protected transformCheckConstraint(node: CheckConstraintNode): CheckConstraintNode;
    protected transformWith(node: WithNode): WithNode;
    protected transformCommonTableExpression(node: CommonTableExpressionNode): CommonTableExpressionNode;
    protected transformCommonTableExpressionName(node: CommonTableExpressionNameNode): CommonTableExpressionNameNode;
    protected transformHaving(node: HavingNode): HavingNode;
    protected transformCreateSchema(node: CreateSchemaNode): CreateSchemaNode;
    protected transformDropSchema(node: DropSchemaNode): DropSchemaNode;
    protected transformAlterTable(node: AlterTableNode): AlterTableNode;
    protected transformDropColumn(node: DropColumnNode): DropColumnNode;
    protected transformRenameColumn(node: RenameColumnNode): RenameColumnNode;
    protected transformAlterColumn(node: AlterColumnNode): AlterColumnNode;
    protected transformModifyColumn(node: ModifyColumnNode): ModifyColumnNode;
    protected transformAddConstraint(node: AddConstraintNode): AddConstraintNode;
    protected transformDropConstraint(node: DropConstraintNode): DropConstraintNode;
    protected transformCreateView(node: CreateViewNode): CreateViewNode;
    protected transformDropView(node: DropViewNode): DropViewNode;
    protected transformGenerated(node: GeneratedNode): GeneratedNode;
    protected transformDefaultValue(node: DefaultValueNode): DefaultValueNode;
    protected transformOn(node: OnNode): OnNode;
    protected transformSelectModifier(node: SelectModifierNode): SelectModifierNode;
    protected transformCreateType(node: CreateTypeNode): CreateTypeNode;
    protected transformDropType(node: DropTypeNode): DropTypeNode;
    protected transformExplain(node: ExplainNode): ExplainNode;
    protected transformSchemableIdentifier(node: SchemableIdentifierNode): SchemableIdentifierNode;
    protected transformAggregateFunction(node: AggregateFunctionNode): AggregateFunctionNode;
    protected transformOver(node: OverNode): OverNode;
    protected transformPartitionBy(node: PartitionByNode): PartitionByNode;
    protected transformPartitionByItem(node: PartitionByItemNode): PartitionByItemNode;
    protected transformBinaryOperation(node: BinaryOperationNode): BinaryOperationNode;
    protected transformUnaryOperation(node: UnaryOperationNode): UnaryOperationNode;
    protected transformDataType(node: DataTypeNode): DataTypeNode;
    protected transformSelectAll(node: SelectAllNode): SelectAllNode;
    protected transformIdentifier(node: IdentifierNode): IdentifierNode;
    protected transformValue(node: ValueNode): ValueNode;
    protected transformPrimitiveValueList(node: PrimitiveValueListNode): PrimitiveValueListNode;
    protected transformOperator(node: OperatorNode): OperatorNode;
    protected transformDefaultInsertValue(node: DefaultInsertValueNode): DefaultInsertValueNode;
}

/**
 * A helper type that allows inferring a select/insert/update/delete query's result
 * type from a query builder or compiled query.
 *
 * ### Examples
 *
 * Infer a query builder's result type:
 *
 * ```ts
 * import { InferResult } from 'kysely'
 *
 * const query = db
 *   .selectFrom('person')
 *   .innerJoin('pet', 'pet.owner_id', 'person.id')
 *   .select(['person.first_name', 'pet.name'])
 *
 * type QueryResult = InferResult<typeof query> // { first_name: string; name: string; }[]
 * ```
 *
 * Infer a compiled query's result type:
 *
 * ```ts
 * import { InferResult } from 'kysely'
 *
 * const compiledQuery = db
 *   .insertInto('person')
 *   .values({
 *     first_name: 'Foo',
 *     last_name: 'Barson',
 *     gender: 'other',
 *     age: 15,
 *   })
 *   .returningAll()
 *   .compile()
 *
 * type QueryResult = InferResult<typeof compiledQuery> // Selectable<Person>[]
 * ```
 */
declare type InferResult<C extends Compilable<any> | CompiledQuery<any>> = C extends Compilable<infer O> ? ResolveResult<O> : C extends CompiledQuery<infer O> ? ResolveResult<O> : never;
declare type ResolveResult<O> = O extends InsertResult | UpdateResult | DeleteResult ? O : O[];

/**
 * Use for system-level logging, such as deprecation messages.
 * Logs a message and ensures it won't be logged again.
 */
declare function logOnce(message: string): void;

export { AddColumnNode, AddConstraintNode, AggregateFunctionBuilder, AggregateFunctionBuilderProps, AggregateFunctionNode, AliasNode, AliasedAggregateFunctionBuilder, AliasedExpression, AliasedRawBuilder, AliasedSelectQueryBuilder, AlterColumnBuilder, AlterColumnBuilderCallback, AlterColumnNode, AlterColumnNodeProps, AlterTableAddForeignKeyConstraintBuilder, AlterTableAddForeignKeyConstraintBuilderProps, AlterTableBuilder, AlterTableBuilderProps, AlterTableColumnAlterationNode, AlterTableColumnAlteringBuilder, AlterTableColumnAlteringBuilderProps, AlterTableDropConstraintBuilder, AlterTableDropConstraintBuilderProps, AlterTableExecutor, AlterTableExecutorProps, AlterTableNode, AlterTableNodeTableProps, AlteredColumnBuilder, AndNode, AnyAliasedColumn, AnyAliasedColumnWithTable, AnyColumn, AnyColumnWithTable, AnySelectQueryBuilder, BinaryOperationNode, COMPARISON_OPERATORS, CamelCasePlugin, CamelCasePluginOptions, CheckConstraintNode, ColumnAlteringInterface, ColumnBuilderCallback, ColumnDataType, ColumnDefinitionBuilder, ColumnDefinitionBuilderCallback, ColumnDefinitionNode, ColumnDefinitionNodeProps, ColumnMetadata, ColumnNode, ColumnType, ColumnUpdateNode, CommonTableExpressionNameNode, CommonTableExpressionNode, ComparisonOperator, ComparisonOperatorExpression, Compilable, CompiledQuery, ConnectionBuilder, ConnectionProvider, ConstraintNode, CreateIndexBuilder, CreateIndexBuilderProps, CreateIndexNode, CreateIndexNodeProps, CreateSchemaBuilder, CreateSchemaBuilderProps, CreateSchemaNode, CreateSchemaNodeParams, CreateTableBuilder, CreateTableBuilderProps, CreateTableNode, CreateTableNodeParams, CreateTypeBuilder, CreateTypeBuilderProps, CreateTypeNode, CreateTypeNodeParams, CreateViewBuilder, CreateViewBuilderProps, CreateViewNode, CreateViewNodeParams, DEFAULT_MIGRATION_LOCK_TABLE, DEFAULT_MIGRATION_TABLE, DataTypeNode, DataTypeParams, DatabaseConnection, DatabaseIntrospector, DatabaseMetadata, DatabaseMetadataOptions, DeduplicateJoinsPlugin, DefaultConnectionProvider, DefaultInsertValueNode, DefaultQueryCompiler, DefaultQueryExecutor, DefaultValueNode, DeleteQueryBuilder, DeleteQueryBuilderProps, DeleteQueryBuilderWithFullJoin, DeleteQueryBuilderWithInnerJoin, DeleteQueryBuilderWithLeftJoin, DeleteQueryBuilderWithRightJoin, DeleteQueryNode, DeleteResult, Dialect, DialectAdapter, DialectAdapterBase, Driver, DropColumnNode, DropConstraintNode, DropConstraintNodeProps, DropIndexBuilder, DropIndexBuilderProps, DropIndexNode, DropIndexNodeProps, DropSchemaBuilder, DropSchemaBuilderProps, DropSchemaNode, DropSchemaNodeParams, DropTableBuilder, DropTableBuilderProps, DropTableNode, DropTablexNodeParams, DropTypeBuilder, DropTypeBuilderProps, DropTypeNode, DropTypeNodeParams, DropViewBuilder, DropViewBuilderProps, DropViewNode, DropViewNodeParams, DummyDriver, DynamicModule, Equals, ErrorLogEvent, ExistsExpression, ExplainFormat, ExplainNode, Explainable, Expression, ExpressionBuilder, ExpressionBuilderProps, ExtractTypeFromReferenceExpression, ExtractTypeFromStringReference, FileMigrationProvider, FileMigrationProviderFS, FileMigrationProviderPath, FileMigrationProviderProps, FilterableQueryNode, ForeignKeyConstraintBuilder, ForeignKeyConstraintBuilderCallback, ForeignKeyConstraintBuilderInterface, ForeignKeyConstraintNode, ForeignKeyConstraintNodeProps, FromNode, FunctionModule, Generated, GeneratedAlways, GeneratedNode, GeneratedNodeParams, GroupByItemNode, GroupByNode, HavingInterface, HavingNode, IdentifierNode, IndexType, InferResult, InsertObject, InsertQueryBuilder, InsertQueryBuilderProps, InsertQueryNode, InsertQueryNodeProps, InsertResult, InsertType, Insertable, IsolationLevel, JoinBuilder, JoinBuilderProps, JoinCallbackExpression, JoinNode, JoinReferenceExpression, JoinType, Kysely, KyselyConfig, KyselyPlugin, KyselyProps, LOG_LEVELS, LimitNode, ListNode, Log, LogConfig, LogEvent, LogLevel, Logger, MIGRATION_LOCK_ID, Migration, MigrationInfo, MigrationProvider, MigrationResult, MigrationResultSet, Migrator, MigratorProps, ModifyColumnNode, MutatingQueryNode, MutationObject, MysqlAdapter, MysqlDialect, MysqlDialectConfig, MysqlDriver, MysqlIntrospector, MysqlOkPacket, MysqlPool, MysqlPoolConnection, MysqlQueryCompiler, MysqlQueryResult, MysqlStream, MysqlStreamOptions, NOOP_QUERY_EXECUTOR, NO_MIGRATIONS, NoMigrations, NoResultError, NoResultErrorConstructor, NonNullableInsertKeys, NoopQueryExecutor, NullableInsertKeys, ON_COMMIT_ACTIONS, ON_MODIFY_FOREIGN_ACTIONS, OffsetNode, OnCommitAction, OnConflictBuilder, OnConflictBuilderProps, OnConflictDatabase, OnConflictDoNothingBuilder, OnConflictNode, OnConflictNodeProps, OnConflictTables, OnConflictUpdateBuilder, OnDuplicateKeyNode, OnDuplicateKeyNodeProps, OnModifyForeignAction, OnNode, OperandValueExpression, OperandValueExpressionOrList, OperationNode, OperationNodeKind, OperationNodeSource, OperationNodeTransformer, OperationNodeVisitor, Operator, OperatorNode, OrNode, OrderByDirectionExpression, OrderByExpression, OrderByItemNode, OrderByNode, OverBuilderCallback, OverNode, ParensNode, PartitionByItemNode, PartitionByNode, PluginTransformQueryArgs, PluginTransformResultArgs, PostgresAdapter, PostgresCursor, PostgresCursorConstructor, PostgresDialect, PostgresDialectConfig, PostgresDriver, PostgresIntrospector, PostgresPool, PostgresPoolClient, PostgresQueryCompiler, PostgresQueryResult, PostgresStream, PrimaryConstraintNode, PrimaryKeyConstraintNode, PrimitiveValueListNode, QueryCompiler, QueryCreator, QueryCreatorProps, QueryExecutor, QueryExecutorProvider, QueryLogEvent, QueryNode, QueryResult, RawBuilder, RawBuilderProps, RawNode, ReferenceExpression, ReferenceExpressionOrList, ReferenceNode, ReferencesNode, RenameColumnNode, ReturningInterface, ReturningNode, RootOperationNode, SchemaMetadata, SchemaModule, SelectAllNode, SelectExpression, SelectExpressionOrList, SelectQueryBuilder, SelectQueryBuilderProps, SelectQueryBuilderWithFullJoin, SelectQueryBuilderWithInnerJoin, SelectQueryBuilderWithLeftJoin, SelectQueryBuilderWithRightJoin, SelectQueryNode, SelectType, Selectable, Selection, SelectionNode, SetOperationNode, SetOperator, SimpleReferenceExpression, SingleConnectionProvider, Sql, SqliteAdapter, SqliteDatabase, SqliteDialect, SqliteDialectConfig, SqliteDriver, SqliteIntrospector, SqliteQueryCompiler, SqliteStatement, StringReference, TRANSACTION_ISOLATION_LEVELS, TableExpression, TableExpressionOrList, TableMetadata, TableNode, Transaction, TransactionBuilder, TransactionSettings, UNARY_FILTER_OPERATORS, UnaryFilterOperator, UnaryOperationNode, UniqueConstraintNode, UnknownRow, UpdateKeys, UpdateQueryBuilder, UpdateQueryBuilderProps, UpdateQueryBuilderWithFullJoin, UpdateQueryBuilderWithInnerJoin, UpdateQueryBuilderWithLeftJoin, UpdateQueryBuilderWithRightJoin, UpdateQueryNode, UpdateResult, UpdateType, UpdateValuesNode, Updateable, ValueExpression, ValueExpressionOrList, ValueListNode, ValueNode, ValuesItemNode, ValuesNode, WhereInterface, WhereNode, WithNode, WithNodeParams, WithSchemaPlugin, isAliasedExpression, isExpression, isKyselyProps, isOperationNodeSource, isRawBuilder, logOnce, sql };
