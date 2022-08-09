import * as cdk from 'aws-cdk-lib';
import {
  aws_ec2 as ec2,
  aws_eks as eks,
} from 'aws-cdk-lib';
import * as construct from 'constructs';

export class CdkEksPlaygroundStack extends cdk.Stack {
  constructor(scope: construct.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 3 });
    new eks.Cluster(this, 'EksCluster', {
      vpc,
      version: eks.KubernetesVersion.V1_21,
      clusterName: 'eks-playground',
    });
  }
}

const app = new cdk.App();

new CdkEksPlaygroundStack(app, 'cdk-eks-playground');

app.synth();